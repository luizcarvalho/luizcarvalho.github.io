fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40luizcarvalho%3Fpage%3D3')
  .then(function(response) {
    response.json().then(function(result) {
      console.log(result)
    });
  });