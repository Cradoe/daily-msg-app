import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveDataToLocalStorage = async (
  n = {},
  ttl = 86400000,
  dataShouldExpire = true
) => {
  const item = {
    data: n.data
  };
  if (dataShouldExpire) {
    const now = new Date();
    item.expiry = now.getTime() + ttl;
  }
  try {
    await AsyncStorage.setItem(n.title, JSON.stringify(item));
  } catch (error) {
    console.log("Something went wrong.", error);
  }
};

export const modifyLocalStorage = async (
  n = {},
  ttl = 86400000,
  dataShouldExpire = true
) => {
  await retrieveDataFromLocalStorage(n.title)
    .then((existingData) => {
      if (!existingData || existingData === undefined) return;

      const newValue = {
        title: n.title
      };
      if (Array.isArray(existingData)) {
        existingData.push(n.data);
        newValue.data = existingData;
      } else {
        newValue.data = {
          ...existingData,
          ...n.data
        };
      }
      return saveDataToLocalStorage(newValue, ttl, dataShouldExpire);
    })
    .catch((error) => console.log("Something went wrong.", error));
};

export const removeDataFromLocalStorage = async (dataName) => {
  try {
    await AsyncStorage.removeItem(dataName);
  } catch (error) {
    console.log("Something went wrong.", error);
  }
};

export const retrieveDataFromLocalStorage = async (resourceKey) => {
  var data = null;
  try {
    await AsyncStorage.getItem(resourceKey)
      .then((res) => {
        if (res !== null) {
          const item = JSON.parse(res),
            now = new Date();

          if (item.expiry) {
            if (now.getTime() > item.expiry) {
              removeDataFromLocalStorage(resourceKey);
            } else {
              data = item.data;
            }
          } else {
            data = item.data;
          }
        }
      })
      .catch((err) => {
        console.log("Something went wrong.", err);
      });

    return data;
  } catch (error) {
    console.log("Something went wrong.", error);
    return null;
  }
};
