listProduct=[];
$(function () {
  loadComponentAdmin();
});

// Load các thành phần của trang Home Page
function loadComponentAdmin(params) {
  $(".MenuSection").load("./MenuAdmin.html");
  $(".SideBarSection").load("./SideBarAdmin.html");
  // $(".ProductAdminSection").load("./ContentProductAdmin.html");
}

function showAccount() {
  $(".ProductAdminSection").load("./Account.html", "data", function (response, status, request) {});
}

function showManufacture() {
  $(".ProductAdminSection").load("./Manufacture.html", "data", function (response, status, request) {});
}

function showCategory() {
  $(".ProductAdminSection").load("./Category.html", "data", function (response, status, request) {});
}

function showProduct() {
  $(".ProductAdminSection").load("./ContentProductAdmin.html", "data", function (response, status, request) {
    fetchListProductAdmin();
  });
}
// function handleCreateNewProduct() {
//   alert("Create New!!");
// }
// function fetchListProductAdmin() {
//   //
//   //Xóa bảng dữ liệu hiện tại
//   $("#tbProductAdmin").empty();
//   // Dùng vòng lặp để tạo 6 product
//   for (let index = 0; index < 6; index++) {
//     $("#tbProductAdmin").append(`
//     <tr>
//       <td>1</td>
//       <td>Samsung Galaxy S22 Ultra 5G</td>
//       <td>30.990.000₫</td>
//       <td>6.9 inches, Chip MediaTek Helio G85 (12nm) mạnh mẽ, Ram 4G, Pin 7000 mAh</td>
//       <td>ProductDetail1</td>
//       <td>5</td>
//       <td>image1.jpg</td>
//       <td>SAMSUNG</td>
//       <td>Điện thoại</td>
//       <td>
//         <button type="button" class="btn btn-warning">Edit</button>
//       </td>
//       <td>
//         <button type="button" class="btn btn-danger">Delete</button>
//       </td>
//   </tr>
//     `);
//   }
// }
function handleCreateNewProduct(params) {
  // alert("Create New!!");
  // Lấy dữ liệu từ các ô Input
  var v_Id = $("#Id").val();
  var v_Name = $("#Name").val();
  var v_Price = $("#Price").val();
  var v_Info = $("#Info").val();
  var v_Detail = $("#Detail").val();
  var v_Star = $("#Star").val();
  // Gọi hàm để lấy tên Ảnh
  var v_Image = getImageName($("#Image").val());
  var v_Manufacturer = $("#Manufacturer").val();
  var v_Category = $("#Category").val();


  // Tạo đối tượng ProductNew để lưu trữ
  var ProductNew = {
    id: v_Id,
    name: v_Name,
    price: v_Price,
    info: v_Info,
    detail: v_Detail,
    ratingStar: v_Star,
    imageName: v_Image,
    manufacturerId: v_Manufacturer,
    categoryId: v_Category,
  };
  // console.log("ProductNew: ", ProductNew);


  // Add thêm sản phẩm vào listProduct
  listProduct.push(ProductNew);
  // Lưu dữ liệu localStorage
  localStorage.setItem("listProduct", JSON.stringify(listProduct));
  // Thực hiện Reset Form
  handleResetForm();
  // Gọi hàm hiển thị lại danh sách sản phẩm
  fetchListProductAdmin();
}


// Hàm Load dữ liệu Product, sau đó đổ dữ liệu vào Table
function fetchListProductAdmin(params) {
  // Reset lại listProduct về Null
  listProduct = [];


  //Lấy dữ liệu từ LocalStorage để sử dụng
  // Kiểm tra xem có dữ liệu dưới LocalStorage không
  if (localStorage && localStorage.getItem("listProduct")) {
    var listProductLocalStorage = JSON.parse(localStorage.getItem("listProduct"));
    // Lưu dữ liệu từ localStorage vào listProduct trong JS để sử dụng
    listProduct = listProductLocalStorage;
  }


  //Xóa bảng dữ liệu hiện tại
  $("#tbProductAdmin").empty();
  // Dùng vòng lặp để tạo product
  for (let index = 0; index < listProduct.length; index++) {
    $("#tbProductAdmin").append(`
    <tr>
      <td>${listProduct[index].id}</td>
      <td>${listProduct[index].name}</td>
      <td>${listProduct[index].price}</td>
      <td>${listProduct[index].info}</td>
      <td>${listProduct[index].detail}</td>
      <td>${listProduct[index].ratingStar}</td>
      <td>${listProduct[index].imageName}</td>
      <td>${listProduct[index].manufacturerId}</td>
      <td>${listProduct[index].categoryId}</td>
      <td>
        <button type="button" class="btn btn-warning">Edit</button>
      </td>
      <td>
        <button type="button" class="btn btn-danger" onclick="handleDelete(${listProduct[index].id})">Delete</button>
      </td>
  </tr>
    `);
  }
}


// Hàm handleResetForm, xóa dữ liệu trong các ô Input
function handleResetForm() {
  // Gọi lại các Form nhập liệu và reset giá trị
  $("#Id").val("");
  $("#Name").val("");
  $("#Price").val("");
  $("#Info").val("");
  $("#Detail").val("");
  $("#Star").val("");
  $("#Image").val("");
  $("#Manufacturer").val("");
  $("#Category").val("");
}


// Hàm lấy tên ảnh
function getImageName(pathImage) {
  // Chuyển đường dẫn thành mảng các phần tử
  var itemArray = pathImage.split("\\");
  // Lấy phần tử cuối cùng
  var imageName = itemArray[itemArray.length - 1];


  return imageName;
}
function handleDelete(idDelete){
  var confirmDelete = confirm("Bạn có chắc muốn xoá sản phẩm?");
  if(confirmDelete){
    var indexPrductDelete = listProduct.findIndex((product) => product.id == idDelete);
    if(indexPrductDelete!==-1){
      listProduct.splice(indexPrductDelete,1);
      localStorage.setItem("listProduct",JSON.stringify(listProduct));
      fetchListProductAdmin();
    }else{
      alert("Không thể xoá sản phẩm")
    }
  }
}