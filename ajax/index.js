function addNewSmartPhone() {
    //lấy dữ liệu từ form html
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
    let newSmartphone = {
        producer: producer,
        model: model,
        price: price
    };
    // gọi phương thức ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newSmartphone),
        //tên API
        url: "http://localhost:8080/api/smartphones",
        //xử lý khi thành công
        success: successHandler

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function successHandler() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/smartphones",
        success: function (data) {
            let content = '<table id="display-list" border="1"><tr>\n' +
                '    <th>Nhà sản xuất</th>\n' +
                '    <th>Mẫu</th>\n' +
                '    <th>Giá</th>\n' +
                '    <th class="btn">Sửa</th>\n' +
                '    <th class="btn">Xóa</th>\n' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += getSmartphone(data[i]);
            }
            content += "</table>";
            document.getElementById('smartphoneList').innerHTML = content;
            document.getElementById('smartphoneList').style.display = "block";
            document.getElementById('add-smartphone').style.display = "none";
            document.getElementById('update-smartphone').style.display = "none";
            document.getElementById('display-create').style.display = "block";
            document.getElementById('title').style.display = "block";
        }
    });
}

function displayFormCreate() {
    document.getElementById('smartphoneList').style.display = "none";
    document.getElementById('add-smartphone').style.display = "block";
    document.getElementById('display-create').style.display = "none";
    document.getElementById('title').style.display = "none";
}

function getSmartphone(smartphone) {
    return `<tr><td>${smartphone.producer}</td><td>${smartphone.model}</td><td>${smartphone.price}</td>` +
        `<td class="btn"><button class="deleteSmartphone" onclick="deleteSmartphone(${smartphone.id})">Xóa</button></td></tr>`;
}

function deleteSmartphone(id) {
    $.ajax({
        type: "DELETE",
        //tên API
        url: `http://localhost:8080/api/smartphones/${id}`,
        //xử lý khi thành công
        success: successHandler
    });
}
let currentUpdateId = null;

function showUpdateForm(smartphone) {
    $('#update-producer').val(smartphone.producer);
    $('#update-model').val(smartphone.model);
    $('#update-price').val(smartphone.price);
    currentUpdateId = smartphone.id;

    document.getElementById('smartphoneList').style.display = "none";
    document.getElementById('add-smartphone').style.display = "none";
    document.getElementById('update-smartphone').style.display = "block";
    document.getElementById('display-create').style.display = "none";
    document.getElementById('title').style.display = "none";
}

function updateSmartPhone() {
    let producer = $('#update-producer').val();
    let model = $('#update-model').val();
    let price = $('#update-price').val();
    let updatedSmartphone = {
        producer: producer,
        model: model,
        price: price
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(updatedSmartphone),
        url: `http://localhost:8080/api/smartphones/${currentUpdateId}`,
        success: successHandler
    });
    event.preventDefault();
}

function getSmartphone(smartphone) {
    return `<tr>
        <td>${smartphone.producer}</td>
        <td>${smartphone.model}</td>
        <td>${smartphone.price}</td>
        <td class="btn"><button class="editSmartphone" onclick='showUpdateForm(${JSON.stringify(smartphone)})'>Sửa</button></td>
        <td class="btn"><button class="deleteSmartphone" onclick="deleteSmartphone(${smartphone.id})">Xóa</button></td>
    </tr>`;
}

function displayFormCreate() {
    document.getElementById('smartphoneList').style.display = "none";
    document.getElementById('add-smartphone').style.display = "block";
    document.getElementById('update-smartphone').style.display = "none";
    document.getElementById('display-create').style.display = "none";
    document.getElementById('title').style.display = "none";
}