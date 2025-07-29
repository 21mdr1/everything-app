import AsyncStorage from '@react-native-async-storage/async-storage';

async function storeData(key: string, value: any, onSuccess = () => {}, onFailure = console.log) {
    try{
        await AsyncStorage.setItem(key, JSON.stringify(value))
        onSuccess();
    } catch(error) {
        onFailure(error);
    }
}

async function getData(key: string, onSuccess = (_: any) => {}, onFailure = console.log) {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        const result = jsonValue != null && JSON.parse(jsonValue);
        onSuccess(result);
        return result;
    } catch(error) {
        onFailure(error)
    }
}

export { storeData, getData }