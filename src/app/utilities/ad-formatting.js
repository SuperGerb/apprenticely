export function calculateTimeElapsed (previousDate, todaysDate) {
  //Get 1 day in milliseconds:
  const oneDay = 1000 * 60 * 60 * 24;
  let datePosted_ms = previousDate.getTime();
  let todaysDate_ms = todaysDate.getTime();
  let difference_ms = todaysDate_ms - datePosted_ms;
  let differenceInDays = Math.round(difference_ms / oneDay);
  if (differenceInDays < 1) {
      //Get 1 hour in milliseconds:
      const oneHour = 1000 * 60 * 60;
      let differenceInHours = Math.round(difference_ms / oneHour);
      if (differenceInHours < 1) {
          return "Less than 1 hour ago";
      } else if (differenceInHours === 1) {
          return differenceInHours + " hour ago";
      } else {
          return differenceInHours + " hours ago";
      }
  } else if (differenceInDays === 1) {
      return differenceInDays + " day ago";
  } else {
      return differenceInDays + " days ago";
  }
}

export function truncateCopy (text, limit) {
  const endOfSentence = /[\.\?\!]/;
  const otherPunctuationMarks = /[\,\;\:]/;

  if (text.length > limit) {
      for (let i = limit; i > 0; i--) {
          if (text.charAt(i) === " ") {
              if (otherPunctuationMarks.test(text.charAt(i - 1) === true)) {
                  return text.slice(0, i - 1) + "...";
              } else if (endOfSentence.test(text.charAt(i - 1)) === false) {
                  return text.slice(0, i) + "...";
              }
          }
      }
  } else {
    return text;
  }
}