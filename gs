<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>商品活动价格公式表</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: flex-start; /* 顶端对齐 */
            height: 100vh;
        }
        .container {
            width: 80%; /* 容器宽度占页面的80% */
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            box-sizing: border-box;
            margin-top: 20px;
        }
        .title {
            text-align: center;
            padding: 20px;
            background-color: #4CAF50;
            color: white;
            border-radius: 10px 10px 0 0;
            margin: -20px -20px 20px -20px;
        }
        .discount-container, .result-container, .final-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            height: 13.33vh; /* 每个容器高度占整个页面五分之二的高度 */
        }
        .discount-item, .result-item, .final-item {
            flex: 1;
            margin: 0 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .discount-item button {
            margin-top: 10px;
            padding: 10px;
            border: none;
            background-color: #4CAF50;
            color: white;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1.2em;
        }
        label {
            margin-top: 10px;
            font-weight: bold;
        }
        input[type="number"], input[type="text"] {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 1.2em;
            font-weight: bold;
        }
        span {
            display: block;
            padding: 10px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 5px;
            text-align: center;
            font-size: 1.2em;
            font-weight: bold;
        }
        .highlight {
            font-weight: bold;
            color: red;
        }
    </style>
    <script>
        // 计算折扣金额和最终到手价
        function calculateDiscount() {
            var price = parseFloat(document.getElementById("price").value);
            var officialStep = parseFloat(document.getElementById("officialStep").value);
            var officialDiscount = parseFloat(document.getElementById("officialDiscount").value);
            var storeStep = parseFloat(document.getElementById("storeStep").value);
            var storeDiscount = parseFloat(document.getElementById("storeDiscount").value);
            var finalPriceInput = parseFloat(document.getElementById("finalPriceInput").value);

            var officialTimes = Math.floor(price / officialStep);
            var storeTimes =  Math.min(Math.floor(price / storeStep), 10); // 限制店铺阶梯不超过10
            var officialTotalDiscount = officialTimes * officialDiscount;
            var storeTotalDiscount = storeTimes * storeDiscount;
            var totalDiscount = officialTotalDiscount + storeTotalDiscount;
            var finalPrice = price - totalDiscount;
            var discountRate = (finalPrice / price).toFixed(2);

            if (isNaN(finalPriceInput)) {
                document.getElementById("requiredCouponAmount").innerText = "0";
            } else if (finalPriceInput < finalPrice) {
                var requiredCouponAmount = price - officialTotalDiscount - finalPriceInput;
                document.getElementById("requiredCouponAmount").innerText = "做优惠金额: " + requiredCouponAmount.toFixed(2);
            } else {
                var diffAmount = finalPriceInput - finalPrice;
                document.getElementById("requiredCouponAmount").innerText = "补差价: " + diffAmount.toFixed(2);
            }

            document.getElementById("officialTotalDiscount").innerText = officialTotalDiscount;
            document.getElementById("storeTotalDiscount").innerText = storeTotalDiscount;
            document.getElementById("totalDiscount").value = totalDiscount;
            document.getElementById("finalPrice").value = finalPrice.toFixed(2);
            document.getElementById("discountRate").value = discountRate;
        }

        // 重置最终到手价和做优惠金额
        function resetFinalPrice() {
            document.getElementById("finalPriceInput").value = "";
            document.getElementById("requiredCouponAmount").innerText = "0";
            calculateDiscount();
        }

        // 保存配置到本地存储
        function saveConfig() {
            var officialStep = document.getElementById("officialStep").value;
            var officialDiscount = document.getElementById("officialDiscount").value;
            var storeStep = document.getElementById("storeStep").value;
            var storeDiscount = document.getElementById("storeDiscount").value;

            localStorage.setItem("officialStep", officialStep);
            localStorage.setItem("officialDiscount", officialDiscount);
            localStorage.setItem("storeStep", storeStep);
            localStorage.setItem("storeDiscount", storeDiscount);

            alert("配置已保存！");
        }

        // 读取本地存储的配置
        function loadConfig() {
            var officialStep = localStorage.getItem("officialStep");
            var officialDiscount = localStorage.getItem("officialDiscount");
            var storeStep = localStorage.getItem("storeStep");
           
var storeDiscount = localStorage.getItem("storeDiscount");

if (officialStep !== null) document.getElementById("officialStep").value = officialStep;
if (officialDiscount !== null) document.getElementById("officialDiscount").value = officialDiscount;
if (storeStep !== null) document.getElementById("storeStep").value = storeStep;
if (storeDiscount !== null) document.getElementById("storeDiscount").value = storeDiscount;

calculateDiscount();
}

// 页面加载时读取配置
window.onload = loadConfig;
</script>
</head>
<body>
<div class="container">
    <h1 class="title">商品活动价格公式表</h1>
    <!-- 官方和店铺满减条件容器 -->
    <div class="discount-container">
        <div class="discount-item">
            <label for="officialStep">官方满减条件（每满多少）：</label>
            <input type="number" id="officialStep" value="300" oninput="calculateDiscount()">
        </div>
        <div class="discount-item">
            <label for="officialDiscount">官方满减金额（减多少）：</label>
            <input type="number" id="officialDiscount" value="30" oninput="calculateDiscount()">
        </div>
        <div class="discount-item">
            <label for="storeStep">店铺满减条件（每满多少）：</label>
            <input type="number" id="storeStep" value="1000" oninput="calculateDiscount()">
        </div>
        <div class="discount-item">
            <label for="storeDiscount">店铺满减金额（减多少）：</label>
            <input type="number" id="storeDiscount" value="100" oninput="calculateDiscount()">
        </div>
        <div class="discount-item">
            <button onclick="saveConfig()">保存配置</button>
        </div>
    </div>
    <!-- 结果展示容器 -->
    <div class="result-container">
        <div class="result-item">
            <label for="price" class="highlight">商品价格：</label>
            <input type="number" id="price" placeholder="请输入商品价格" oninput="resetFinalPrice()" class="highlight">
        </div>
        <div class="result-item">
            <label for="officialTotalDiscount">官方满减总额：</label>
            <span id="officialTotalDiscount">0</span>
        </div>
        <div class="result-item">
            <label for="storeTotalDiscount">店铺满减总额：</label>
            <span id="storeTotalDiscount">0</span>
        </div>
        <div class="result-item">
            <label for="totalDiscount">优惠金额：</label>
            <input type="number" id="totalDiscount" readonly>
        </div>
        <div class="result-item">
            <label for="finalPrice" class="highlight">到手价：</label>
            <input type="text" id="finalPrice" readonly class="highlight">
        </div>
        <div class="result-item">
            <label for="discountRate">折扣：</label>
            <input type="text" id="discountRate" readonly>
        </div>
    </div>
    <!-- 最终到手价和优惠金额容器 -->
    <div class="final-container">
        <div class="final-item">
            <label for="finalPriceInput">最终到手价：</label>
            <input type="number" id="finalPriceInput" placeholder="请输入最终到手价" oninput="calculateDiscount()">
        </div>
        <div class="final-item">
            <label for="requiredCouponAmount">做优惠金额：</label>
            <span id="requiredCouponAmount">0</span>
        </div>
    </div>
</div>
</body>
</html>
