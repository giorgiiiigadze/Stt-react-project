export default function shrinkedTitle (audio, maxCharacters){
    return audio.file_title.length >= 20
      ? audio.file_title.slice(0, maxCharacters) + "..."
      : audio.file_title
}