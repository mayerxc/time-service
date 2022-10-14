import express from 'express';

const router = express.Router();

router.get('/:time', (req, res) => {
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

  if (!isNaN(req.params.time)) {
    // if is a number that can be unix time
    const result = unixToNatural(req.params.time);
    const data = { unix: req.params.time, natural: result };
    res.json(data);
  } else {
    // if NaN then try to turn it into a date
    const natural = new Date(req.params.time);
    if (!isNaN(natural)) {
      // did the date turn into a javascript date number???
      const unix = natural / 1000;
      const intoNatural = unixToNatural(unix);

      // using intoNatural instead of req.params.time because returns whatever date format is there
      // instead of nice unixToNatural format
      const data3 = { unix: unix, natural: intoNatural };
      res.json(data3);
    } else {
      // if it didn't turn into a date format respond with nulls
      const data2 = { unix: null, natural: null };
      res.json(data2);
    }
  }
});

export default router;
