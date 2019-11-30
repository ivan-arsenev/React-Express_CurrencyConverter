export default class CartService {
  _apiBase = "http://localhost:5000/api"; // todo
  sendResource = async (url, data) => {
    try {
      const response = await fetch(`${this._apiBase}${url}`, {
        method: "POST",
        body: JSON.stringify(data),

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        }
      });
      const json = await response.json();

      return json;
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  //

  getResultOfConvert = async data => {
    const res = await this.sendResource(`/convert/`, data);
    return res.total;
  };
}
