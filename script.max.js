(function(){
    // function to wait for the Dom load
    const checkReadyState = callback => {
                    if (document.readyState == 'loading') {
                        document.addEventListener("DOMContentLoaded", function() {
                            callback(true)
                        })
                    } else {
                        callback(true)
                    }
                }
    // get unique values and duplicate values from the input array
    const getUniqueAndDuplicates = input_arr =>{
        let unique_arr = []
        let duplicate_arr = []
        for(let index in input_arr){
            const value = input_arr[index]
            if(input_arr.indexOf(value,Number(index)+1) !=-1 || duplicate_arr.indexOf(value)!=-1){
                if(!duplicate_arr.includes(value)) duplicate_arr.push(value)
            }else{
                unique_arr.push(value)
            }
        }
        return{
            unique:unique_arr,
            duplicates:duplicate_arr
        }
    }

    // convert the range values like 5-1000 to individual numbers
    const convertRangeToArray =range_input =>{
        let range_arr = []
        let [min,max] = range_input.split('-').map((val)=>Number(val))
        if(max<=min){
            [max,min] = [min,max]
        }
        for (var i = min; i <= max; i++){
            range_arr.push(i);
        }
        return range_arr
    }

    const processNumbers = input =>{
        let input_array = input.split(',')
        let new_array = [7000,7001,7002,7003,7004,7005]
        for(value of input_array){
            if(value.indexOf('-')!=-1){
                let arr = convertRangeToArray(value)
                new_array.push(...arr)
            }else{
                new_array.push(Number(value))
            }
        }
        return new_array
    }

    const isValidInput = input =>{
        const regexPattern = /^[0-9,-\s]*$/g;
        const result = input.match(regexPattern);
        if(result && result[0]) {
          return result[0]
        }
        return false;
    }
    
    // function to handle on button click
    function buttonClickHandler(){
        let input_value = document.getElementById('input-value-holder').value
        let error_div = document.getElementById('error-holder')
        error_div.classList.replace('show','hide')
        if(isValidInput(input_value)){
            let numbers_arr = processNumbers(input_value);
            let {unique,duplicates} = getUniqueAndDuplicates(numbers_arr)
            let ele = document.getElementById('duplicate_value_holder')
            ele.innerText = String(duplicates)
            ele.parentElement.classList.replace('hide','show')
            ele = document.getElementById('final_list_holder')
            ele.innerText = String(unique)
            ele.parentElement.classList.replace('hide','show')
        }else{
            error_div.classList.replace('hide','show')    
        }
    }

    function listenerHandler(){
        let button = document.getElementById('input-button')
        button.addEventListener('click',buttonClickHandler)
    }
    checkReadyState(()=>{
        listenerHandler()
    })
})()