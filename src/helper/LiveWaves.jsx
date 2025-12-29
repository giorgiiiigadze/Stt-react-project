import { useEffect, useRef } from "react";

export default function LiveWaves({ isRecording }) {
  const canvasRef = useRef(null);

  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);

  const smoothRef = useRef(null);
  const fadeRef = useRef(1);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const stop = async () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;

      streamRef.current?.getTracks().forEach(t => t.stop());
      streamRef.current = null;

      if (audioCtxRef.current) {
        try {
          await audioCtxRef.current.close();
        } catch {}
        audioCtxRef.current = null;
      }

      fadeRef.current = 1;
    };

    const start = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyserRef.current = analyser;

      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.92;

      source.connect(analyser);

      const bufferLength = analyser.fftSize;
      const dataArray = new Uint8Array(bufferLength);
      smoothRef.current = new Float32Array(bufferLength);

      const lineWidth = 2;
      const gap = 3;

      const draw = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        const centerY = h / 2;

        ctx.clearRect(0, 0, w, h);

        analyser.getByteTimeDomainData(dataArray);

        const totalLines = Math.floor(w / (lineWidth + gap));
        const step = Math.max(1, Math.floor(bufferLength / totalLines));

        fadeRef.current *= isRecording ? 1 : 0.9;

        timeRef.current += 0.015;
        const idleWave = Math.sin(timeRef.current) * 0.015;

        ctx.strokeStyle = "rgba(180,180,180,0.7)";
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";

        let x = 0;

        for (let i = 0; i < bufferLength; i += step) {
          let v = Math.abs((dataArray[i] - 128) / 128);

          if (v < 0.02) v = 0;

          v += idleWave;

          smoothRef.current[i] += (v - smoothRef.current[i]) * 0.12;

          const amplitude =
            smoothRef.current[i] * (h * 1.45) * fadeRef.current;

          ctx.beginPath();
          ctx.moveTo(x, centerY - amplitude);
          ctx.lineTo(x, centerY + amplitude);
          ctx.stroke();

          x += lineWidth + gap;
          if (x > w) break;
        }

        rafRef.current = requestAnimationFrame(draw);
      };

      draw();
    };

    if (isRecording) start();
    else stop();

    return () => {
      window.removeEventListener("resize", resize);
      stop();
    };
  }, [isRecording]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        display: "block",
      }}
    />
  );
}
