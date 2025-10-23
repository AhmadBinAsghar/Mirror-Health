import { prefHandler } from "../local/PrefHandler";
import { isDebugging } from "../../utilis/Debugging";
import { LocalKeys } from "../local/LocalKeys";

class WebHandler {

  async getNetworkRequest(url, bodyParams, onSuccess, onFailure) {
    try {
      prefHandler.getSession(LocalKeys.SESSION_TOKEN_KEY).then(token => {
        if (isDebugging) {
          console.log('\n\nauthToken: ', token, '\n\n')
        }

        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        var raw = bodyParams;

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(url, requestOptions)
          .then(response => response.json())
          .then(async (response) => {

            if (isDebugging) {
              console.log("\n\nRESPOSNE==>", response, '\n\n')
            }

            if (response.success == true) {
              onSuccess(response)
            } else {
              onFailure(response)
            }
          }).catch((error) => {
            if (isDebugging) {
              console.log("Error==>", error.message);
            }
            onFailure(error)
          })
      })

    } catch (error) {
      if (isDebugging) {
        console.log('WebHandler verifyEmail catch block: ', error)
      }
      onFailure(error)
    }

  }

  async uploadImage(url, bodyParams, onSuccess, onFailure) {
    try {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "multipart/form-data");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: bodyParams,
      };

      await fetch(url, requestOptions)
        .then(response => response.json())
        .then(async (response) => {

          if (isDebugging) {
            console.log("\n\nRESPOSNE==>", response, '\n\n')
          }

          if (response.success == true) {
            onSuccess(response)
          } else {
            onFailure(response)
          }
        }).catch((error) => {
          if (isDebugging) {
            console.log("Error==>", error.message);
          }
          onFailure(error)
        })
    } catch (error) {
      if (isDebugging) {
        console.log('WebHandler verifyEmail catch block: ', error)
      }
      onFailure(error)
    }
  }

  async searhRequest(url, query, page, authToken, onSuccess, onFailure) {
    try {
      console.log('\n\n\nsearch query ', query, '\n\nurl:\n', url)
      console.log('\n\n\nsearch query token', authToken, '\n\nurl:\n', url)

      var myHeaders = new Headers();
      myHeaders.append("Authorization", authToken);


      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`${url}?q=${query}&page=${page}&type=create`, requestOptions)
        .then(response => response.json())
        .then(async (response) => {

          if (isDebugging) {
            console.log("\n\nRESPOSNE==>", response, '\n\n')
          }

          if (response.success == true) {
            onSuccess(response)
          } else {
            onFailure(response)
          }
        }).catch((error) => {
          if (isDebugging) {
            console.log("Error==>", error.message);
          }
          onFailure(error)
        })
    } catch (error) {
      if (isDebugging) {
        console.log('WebHandler verifyEmail catch block: ', error)
      }
      onFailure(error)
    }
  }

}

export const webHandler = new WebHandler();

export const API_REQUEST = async (
  url,
  method,
  endPoint,
  data,
  onSuccess,
  onFailed
) => {
  const token = await AsyncStorage.getItem(LocalKeys.SESSION_TOKEN_KEY);
  let header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: token,
  };
  fetch(url, {
    method: method,
    body: data ? JSON.stringify(data) : null,
    headers: header,
  })
    .then(async (response) => {
      // get json response here
      let jsonData = await response.json();
      if (response.status === 200) {
        onSuccess(jsonData);
      } else {
        // Rest of status codes (400,500,303), can be handled here appropriately
        onFailed(jsonData.message);
      }
    })
    .catch((err) => {
      onFailed("Network error");
    });
};
