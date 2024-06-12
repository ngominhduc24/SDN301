export const linkYoutube = str => {
  if (!!str?.includes("youtu.be/"))
    return str?.replace("youtu.be", "www.youtube.com/embed")

  if (!!str?.includes("youtube.com/watch?v="))
    return str?.replace("watch?v=", "embed/").split("&")[0]
}

export const linkYoutubeImg = str => {
  if (str?.includes("https://youtu.be/"))
    return `https://img.youtube.com/vi/${str?.replace(
      "https://youtu.be/",
      "",
    )}/0.jpg`
  if (str?.includes("https://www.youtube.com/watch?v="))
    return `https://img.youtube.com/vi/${
      str?.replace("https://www.youtube.com/watch?v=", "").split("&")[0]
    }/0.jpg`
}
