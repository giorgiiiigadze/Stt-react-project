export default function shrinkedTitle (audio){
    return audio.file_title.length >= 20
      ? audio.file_title.slice(0, 15) + "..."
      : audio.file_title
}