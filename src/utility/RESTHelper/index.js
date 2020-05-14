class RESTHelper {

  constructor(env) {

    if(env === "production") {

      this.protocol = "https";
      this.host = "www.blackplumapparel.com";
      this.port = null;
    }
    else {
      this.protocol = "http";
      this.host = "localhost";
      this.port = "8080";
    }
  }

  getPort() {

    return this.port ? `:${this.port}` : '';
  }

  getBaseUrl() {

    return `${this.protocol}://${this.host}${this.getPort()}`;
  }
}

export default RESTHelper;
