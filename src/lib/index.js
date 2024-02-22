/**
 * Return value from configuration
 * @param {string} key key to be searched
 * @param {string|null} def default value to be used 
 * @returns {string|undefined}
 */




export const config =(key, def=null) =>{
    const k =`VITE_${key.toUpperCase()}`
    const env = import.meta.env

    if(k in env){
        return env[k]
    }
    if(def){
        return def
    }
}

/**
 * Save data in webStorage
 * @param {string} key key to be searched
 * @param {string} value data to be stored
 * @param {Boolean} remember Store long-term or not
 */



export const setStorage =(key , value , remember = false)=>{
    remember ? localStorage.setItem(key, value) : sessionStorage.setItem(key, value)
}

/**
 * Get data from webstorage
 * @param {string} key Name of the value
 * @returns {string|null}
 */

export const getStorage = (key)=>{
    return localStorage.getItem(key) || sessionStorage.getItem(key)
}

/**
 * Remove data from webstorage
 * @param {string} key name of the value 
 * @returns 
 */

export const delStorage = (key)=>{
    localStorage.removeItem(key) 
    sessionStorage.removeItem(key)
}


/**
 * Return url for the given image file.
 * 
 * @param {string} filename Name of  image file
 * @returns string
 */

export const imgUrl = filename =>{
    return`${import.meta.env.VITE_API_URL}/image/${filename}`
}