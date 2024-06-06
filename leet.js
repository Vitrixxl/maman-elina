/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {

    console.log(rArray)
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            for (let k = 0; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] == 0) {
                    console.log("hey")
                    rArray.push([nums[i] + nums[j] + nums[k]])
                    nums.filter((num) => num == nums[i] || num == nums[j] || num == nums[k])
                }


            }

        }

    }
    return rArray
};

console.log(threeSum[-1, 0, 1, 2, -1, -4])