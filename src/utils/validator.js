export const validateMovie = (movieInfo) => {
  const {
    title,
    storyLine,
    language,
    releasedDate,
    status,
    category,
    genres,
    tags,
    cast,
  } = movieInfo;

  if (!title.trim()) return { error: "Title is missing!" };
  if (!storyLine.trim()) return { error: "story line is missing!" };
  if (!language.trim()) return { error: "Language is missing!" };
  if (!releasedDate.trim()) return { error: "Released date is missing!" };
  if (!status.trim()) return { error: "Status is missing!" };
  if (!category.trim()) return { error: "Category is missing!" };

  // Validation for genres
  //  checking if the genres is array or not

  if (!genres.length) return { error: "Genres are missing!" };
  // checking genres needs to be filled with string value
  for (let gen of genres) {
    if (!gen.trim()) return { error: "Invalid genres!" };
  }

  // Validation for tags
  //  checking if the tags is array or not
  if (!tags.length) return { error: "Tags are missing!" };

  // checking tags needs to be filled with string value
  for (let tag of tags) {
    if (!tag.trim()) return { error: "Invalid tags!" };
  }

  // Validation for cast
  //  checking if the cast is array or not
  if (!cast.length) return { error: "Cast & Crew are missing!" };

  // checking tags needs to be filled with string value
  for (let c of cast) {
    if (typeof c !== "object") return { error: "Invalid Cast!" };
  }

  return { error: null };
};

export const postValidator = (postInfo) => {
  const { title, category, content } = postInfo;

  if (!title.trim()) return { error: "Post Title is required!" };
  if (!category.trim()) return { error: "Category is missing!" };
  if (!content.trim()) return { error: "Content is missing!" };
};
