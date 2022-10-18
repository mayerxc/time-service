import express from 'express';

function unixToNatural(unix) {
  const date = new Date(unix * 1000);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const result = `${month} ${day}, ${year}`;
  return result;
}

const router = express.Router();

router.get('/:time', (req, res) => {
  if (!isNaN(req.params.time)) {
    // if is a number that can be unix time
    const natural = unixToNatural(req.params.time);
    const result = { unix: req.params.time, natural: natural };
    res.json(result);
  } else {
    // if NaN then try to turn it into a date
    const date = new Date(req.params.time);
    if (!isNaN(date)) {
      // did the date turn into a javascript date number???
      const unix = date / 1000;
      const natural = unixToNatural(unix);

      // using intoNatural instead of req.params.time because returns whatever date format is there
      // instead of nice unixToNatural format
      const result = { unix: unix, natural: natural };
      res.json(result);
    } else {
      // if it didn't turn into a date format respond with nulls
      const result = { unix: null, natural: null };
      res.json(result);
    }
  }
});

export default router;
