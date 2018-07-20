/**
 * @description
 * @author shenzekun
 * @param {*} s
 * @returns
 */
function init(s) {
        var len = s.length,
            s_new = [];
        s_new.push('$');
        s_new.push('#');
        var j = 2;
        for(var i = 0; i < len; i++) {
            s_new.push(s[i]);
            s_new.push('#');
        }
         s_new.push('\0');
        return s_new;
}
function min(a, b) {
        return a > b ? b : a;
}
function max(a, b) {
        return a > b ? true : false;
}
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    var s_new;
    s_new = init(s);
    var p = [];
    var len = s_new.length,  //取得新字符串长度并完成向s_new的转换  
        maxLen = -1,  //最长回文长度  
        id,
        mx = 0,
        p = [0],
        maxindex,
        maxnumber;
    
    for (var i = 1; i < len; i++) {
        if (i < mx)
            p[i] = min(p[2 * id - i], mx - i);  //需搞清楚上面那张图含义, mx和2*id-i的含义
        else
            p[i] = 1;

        while (s_new[i - p[i]] == s_new[i + p[i]])  //不需边界判断，因为左有'$',右有'\0'  
            p[i]++;


        if (mx < i + p[i]) { //我们每走一步i，都要和mx比较，我们希望mx尽可能的远，这样才能更有机会执行if (i < mx)这句代码，从而提高效率  
        
            id = i;
            mx = i + p[i];
        }

       if( !max(maxLen, p[i] - 1) ) {
           maxLen = p[i] - 1;
           maxindex = i;
           maxnumber = p[i] - 1;
       }
        
    }
    var maxle = maxindex + maxnumber;
    var number = '';
    for (var k = maxindex - maxnumber; k < maxle; k++) {
        if(s_new[k] != '$' && s_new[k] != '#') {
            number+=s_new[k];
        }
    }
    return number;
};
var reverse = function(x) {
    let rever = 0,
        sum = x;
        fu = false;
    if (sum < 0) {
        fu = true;
        sum = Math.abs(sum);
    }
    while (sum) {
        rever = (rever*10 + sum%10);
        sum = Math.floor(sum/10);
    };
    if (sum > 32767 || sum < -32768) {
        return 0;
    }
    if (fu) {
        return -rever;
    }
    return rever;
};
console.log(Number.MAX_VALUE);
var isPalindrome = function(x) {
    var sum = Math.abs(x),
    rever = 0;
    
    while (sum > 0) {
        rever = ( (rever * 10) + Math.floor(sum%10) );
        sum = Math.floor(sum / 10);
    }
    
    if ( rever === Math.abs(x) ) {
       return true; 
    }
    return false;
};
var convert = function(s, numRows) {
    var string = '',
        number = [],
        len = s.length,
        i = 0,
        run = true,
        n = numRows;
    if (numRows === 1) return s;
    while ( i < numRows ) {
        number[i++] = '';
    }
    i = 0;
    for ( var k = 0; k < len; k++ ) {

        if ( run === true ) {
            if (i < n) {
                number[i++] += s[k];
            }
            if (i == numRows) {
                run = false;
                i = numRows - 1;
            }
        } else {
            if (i >= 0) {
                number[--i] += s[k];
            }
            if (i == 0) {
                run = true;
                i++;
            }
        }
    }
    for (i = 0; i < numRows; i++) {
        string += number[i];
    }
    return string;
};
var ws = new WebSocket("wss://echo.websocket.org");
function webs() {
    // var ws = new WebSocket("wss://echo.websocket.org");

    ws.onopen = function(evt) { 
      console.log("Connection open ..."); 
    };

    ws.onmessage = function(evt) {
      console.log( "Received Message: " + evt.data);
    };

    ws.onclose = function(evt) {
      console.log("Connection closed.");
    }; 
    // ws.send("1");  
}
// console.log('L' == 'v')
var romanToInt = function(s) {
    let code = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    };
    let str = s;
    let sum = 0;
    // for ( let i = 1; i < len; i++ ) {
    //     if ( code[ s[i] ] > code[ s[i-1] ] ) {
    //         sum += ( code[ s[i] ] - code[ s[i-1] ]);
    //         i++
    //     }
    // }
    while ( str ) {
        if ( code[ str[0] ] < code[ str[1] ] ) {
            sum += ( code[ str[1] ] - code[ str[0] ]);
            str = str.slice(1);
            str = str.slice(1);
        } else {
            sum += code[ str[0] ];
            str = str.slice(1);
        }
    }
    console.log(sum);
    return sum;
};
(function () {
    var a;
    if (a === undefined) {
        console.log("111");
    }
})()
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
        if (strs.length == 0) {
            return '';
        }
    let min = strs[0].length,
        str = '';
    
    for (let i = 1; i < strs.length; i++) {
        min = Math.min(strs[i].length, min);
    };
    
    i = 0;
    for (; i < min; i++) {
        let same = true;
        for(let j = 1; j < strs.length; j++) {
            if (strs[j][i] !== strs[0][i]) {
                same = false;
            }
        }
        if (same) {
            str += strs[0][i];
        } else {
            break;
        }
    }
    console.log(str);
    return str;
};

/**
 * 有效的括号
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    //初始化判断值
    let valid = true,
        temp = []
    
    if (s.length == 1) {
        return false
    }
    //利用循环进行判断
    while (s.length > 0) {
        //对首字符进行判断
        if (s[0] === '(' || s[0] === "{" || s[0] === "[") {
            //将首字符放入容器
            temp.push(s[0])
            s = s.slice(1)
        } else {
            if ((s[0] == ')' && temp[temp.length - 1] == '(') || (s[0] == ']' && temp[temp.length - 1] == '[') || (s[0] == '}' && temp[temp.length - 1] == '{')) {
                s = s.slice(1)
                temp.pop()
            } else {
                valid = false
                break
            }
        }
        
    }
    if (temp.length > 0 && s.length == 0) {
        valid = false
    }
    return valid
};

/**三数之和
 * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums.sort(function (a,b) {
        return a-b
    })
    let res = []

    for (let k = 0; k < nums.length; ++k) {
        if (nums[k] > 0) break;
        if (k > 0 && nums[k] == nums[k - 1]) continue;
        let target = 0 - nums[k];
        let i = k + 1, j = nums.length - 1;
        while (i < j) {
            if (nums[i] + nums[j] == target) {
                res.push([nums[k], nums[i], nums[j]]);
                while (i < j && nums[i] == nums[i + 1]) ++i;
                while (i < j && nums[j] == nums[j - 1]) --j;
                ++i; --j;
            } else if (nums[i] + nums[j] < target) ++i;
                else --j;
        }
    }
    return res
    // let temp = [],
    //     isHave = false

    // if (nums.length < 3) {
    //     return temp
    // }

    // for (let i = 0; i < nums.length - 2; i++) {
    //     for (let j = i + 1; j < nums.length - 1; j++) {
    //         for (let k = j +1; k < nums.length; k++)
    //             if ((nums[i] + nums[j] + nums[k]) == 0) {
    //                 for (let l = 0; l < temp.length; l++) {
    //                     let t = []
    //                     t.push(nums[i])
    //                     t.push(nums[j])
    //                     t.push(nums[k])
    //                     for (let o = 0; o < 3; o++) {
    //                         for (let h = 0; h < 3; h++) {
    //                             if (temp[l][o] == t[h]) {
    //                                 t.splice(h, 1)
    //                             }
                                
    //                         }
    //                     }
    //                     if (t.length == 0) {
    //                         isHave = true
    //                     }
    //                 }
    //                 if (isHave == false) {
    //                     let a = []
    //                     a.push(nums[i])
    //                     a.push(nums[j])
    //                     a.push(nums[k])

    //                     temp.push(a)
    //                 }
    //                 isHave = false
                    
    //             }
    //     }
    // }
    // return temp
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let  head = new ListNode(),
         now1 = head
    head.next = null
    while (l1 || l2) {
        now1.next = new ListNode()
        now1 = now1.next
        if (l1.val <= l2.val) {
            now1.val = l1.val
            l1 = l1.next
        } else {
            now1.val = l2.val
            l2 = l2.next
        }

    }

    if (l1) {
        while (l1) {
            now1.next = new ListNode()
            now1 = now1.next
            now1.val = l1.val
            l1 = l1.next
        }
    }
    
    if (l2) {
        while (l2) {
            now1.next = new ListNode()
            now1 = now1.next
            now1.val = l2.val
            l2 = l2.next
        }
    }
    
    head = head.next
    return head
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {

    
    for (let i = 0; i < nums.length; i++) {
        while (nums[i] === nums[i + 1]) {
            for (let j = i; j < nums.length - 1; j++) {
                nums[j] = nums[j + 1]
            }
            nums.length = nums.length - 1
        }

    }
    
    return nums.length
};

/**
 * 整数装换罗马数
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    if (num > 3999 || num < 0) return ''
    let number = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
        flag = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'],
        str = '';
    
    //需要利用循环进行判断，实质就是将number数组减num不断的判断大小
    for (let i = 0; i < number.length; i++) {
        if (num < number[i]) continue
        while (num >= number[i]) {
            num -= number[i]
            str += flag[i]
        }
        if (num == 0) break
    }
    return str
};
// (function() {

// var x = foo();

// var foo = function foo() {
//   return "foobar"
// };
//   return x;
// })();
function hexCharCodeToStr(hexCharCodeStr) {
    num = 15621467
    return num.toString(16);
}


/**
 * 移除元素
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    for (let i = 0; i < nums.length; i++) {
        if (val === nums[i]) {
            nums.splice(i, 1)
            i--
        }
    }
    return nums.length
};


/**
 * 电话号码的字母组合算法
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    let numberArray = [[], ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'], ['j', 'k', 'l'], ['m', 'n', 'o'], ['p', 'q', 'r', 's'], ['t', 'u','v'], ['w','x','y', 'z']]

    if (!digits || digits.length == 0) return []

    let array = []

    for (let i = 0; i < digits.length; i++) {
        array.push(numberArray[parseInt(digits[i]) - 1])
    }

    let strArray = []
    //利用已经生成的字符继续生成字符
    for (let i = 0; i < array[0].length; i++) {
        strArray.push(array[0][i])
    }
    for (let i = 1; i < array.length; i++) {
        //开始赋值
        let nowArray = []
        for (let k = 0; k < strArray.length; k++) {
            for (let j = 0; j < array[i].length; j++) {
                nowArray.push(strArray[k] + array[i][j])
            }
        }
        strArray = nowArray     
    }
    return strArray
};


    /*回溯法解决该问题
    回溯算法实际上一个类似枚举的搜索尝试过程，主要是在搜索尝试过程中寻找问题的解，当发现已不满足求解条件时，就“回溯”返回，尝试别的路径。回溯法是一种选优搜索法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法，而满足回溯条件的某个状态的点称为“回溯点”。许多复杂的，规模较大的问题都可以使用回溯法，有“通用解题方法”的美称。”
    */
   /**
     * @param {number} n
     * @return {string[]}
     */
    function generateParenthesis(n) {
        var res = [];
        helper("",res,n,0,0);
        function helper(cur, res, n, left, right)
        {
            //因为right是右括号，数量=n 表明此时已经找到一个结果
            if (right == n)
            {
                res.push(cur);
            }
            //可以添加一个左括号
            if (left < n)
            {
                helper(cur+'(',res,n,left+1,right);
            }
            //添加一个右括号
            if (right < left)
            {
                helper(cur+')',res,n,left,right+1);
            }
        }
        return res;
    }


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */  
var swapPairs = function(head) {
    let header = head
    while (header) {

        if (!header.next) break
        let t = header.val;
        let p = header.next;
        console.log(p)
        header.val = p.val
        p.val = t
        header = p.next
    }
    // console.log(header.val)
    return head
};
function ListNode(val) {
    this.val = val;
    this.next = null;
}
a = new ListNode(1)
a.next = new ListNode(2)
a.next.next = new ListNode(3)
a.next.next.next = new ListNode(4)
swapPairs(a)