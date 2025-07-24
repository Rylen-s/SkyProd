app.get('/api/recommendations', authenticate, (req, res) => {
    // for now, return hard-coded “quest” suggestions
    res.json([
      { id: 1, title: 'Do 10 push-ups', difficulty: 1 },
      { id: 2, title: 'Read 5 pages of a book', difficulty: 1 }
    ]);
  });