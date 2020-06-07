class Api
{

  baseURL = './wp-api.php';

  constructor(baseURL)
  {
    if(baseURL) {
      this.baseURL = baseURL;
    }
  }

  query(method, endpoint, data) {

    let options = {
      method: method,
      mode: 'cors',
      cache: 'no-cache'
    }

    return fetch(this.baseURL + endpoint, options).then(function(response) {
      return response.json();
    });
  }


  getTags() {
    return this.query('GET', '/?action=get_tags');
  }




  getEpisodes() {
    return this.query('GET', '/?action=get_episodes');
  }






}




