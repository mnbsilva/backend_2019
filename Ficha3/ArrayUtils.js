var arrayutils = {
    isEmpty: function (array) {
        if (array.length == 0)
            return true;
        else
            return false;
    },
    max: function (array) {
        var max = array[0];
        for (var i = 0; i < array.length; i++) {
            if (array[i] > max)
                max = array[i];
        }
        return max;
    },
    min: function (array) {
        var min = array[0];
        for (var i = 0; i < array.length; i++) {
            if (array[i] < min)
                min = array[i];
        }
        return min;
    },
    average: function (array) {
        var average = 0;
        for (var i = 0; i < array.length; i++) {
            average += array[i];
        }
        return average / array.length;
    },
    indexOf: function (array, value) {
        var indexOf = -1;
        for (var i = 0; i < array.length; i++) {
            if (value == array[i]) {
                indexOf = i;
            }
        }
        return indexOf;
    },
    // //incompleto//
    // subArray: function(array, startIndex, endIndex){
    //     var subArray = [];
    //     for (i=startIndex; i<=endIndex; i++){
    //         subArray += array[i] + ' ';
    //         }
    //     return subArray;
    // },
    isSameLength: function (a1, a2) {
        if (a1.length == a2.length) {
            return true;
        }
        else {
            return false;
        }
        return isSameLength;
    },
    // incompleto //
    reverseArray: function (array) {
        var reverseArray = [];
        for (i=0, i<array, i++) {
            reverseArray += array[i];
        }
            reverseArray.push(array[i]);
        return reverseArray;
    },
};
module.exports = arrayutils;