// Initialize datepicker for the input field with id "input-from" with month/year format;
$("#input-from").datepicker({
  format: "mm/yyyy",
  startView: "months",
  minViewMode: "months",
});
// Initialize datepicker for the input field with id "input-to" with month/year format
$("#input-to").datepicker({
  format: "mm/yyyy",
  startView: "months",
  minViewMode: "months",
});

// This block of code also runs when the document is fully loaded and ready
$(document).ready(function () {
  // Define variables for select trigger, options container, and options
  const $selectTrigger = $(".select-trigger");
  const $optionsContainer = $(".options-container");
  const $options = $(".option");

  // When the select trigger is clicked, toggle the visibility of the options container
  $selectTrigger.click(function () {
    $optionsContainer.slideToggle();
  });

  // Loop through each option
  $options.each(function () {
    // When an option is clicked
    $(this).click(function () {
      // Toggle the "selected" class and update the tick-box icon
      if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        $(this)
          .find(".tick-box i")
          .removeClass("fa-square-check")
          .addClass("fa-square");
      } else {
        $(this).addClass("selected");
        $(this)
          .find(".tick-box i")
          .addClass("fa-square-check")
          .removeClass("fa-square");
      }

      // Get the text of selected options and update the select trigger text accordingly
      let selectedOptions = $(".option.selected")
        .map(function () {
          return $(this).find(".icon").text();
        })
        .get();

      if (selectedOptions.length > 0) {
        $selectTrigger.text(selectedOptions.join(", "));
      } else {
        $selectTrigger.text("---none---");
      }
    });
  });

  // Hide the options container when clicking outside of the select trigger or options container
  $(document).click(function (e) {
    if (
      !$selectTrigger.is(e.target) &&
      !$optionsContainer.is(e.target) &&
      $optionsContainer.has(e.target).length === 0
    ) {
      $optionsContainer.hide();
    }
  });
});
//ENUM FOR EACH MONTH
const enum_months = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};
//CREATE DATE DATA IN FILTER
document.addEventListener("DOMContentLoaded", function () {
  const applyBtn = document.getElementById("apply");
  const clearBtn = document.getElementById("clear");
  const startDate = document.getElementById("input-from");
  const endDate = document.getElementById("input-to");
  applyBtn.addEventListener("click", function (event) {
    event.preventDefault();
    alert("Apply filter");
    console.log("===========Start Day=============");
    console.log(startDate.value);
    console.log("===========End Day===============");
    console.log(endDate.value);
    $("#year-head").empty(); // Clear the content of #year-head
    $("#month-subhead").empty(); // Clear the content of #month-subhead
    // Split start date and end date into year and month
    const startYear = parseInt(startDate.value.split("/")[1]);
    const startMonth = parseInt(startDate.value.split("/")[0]);
    const endYear = parseInt(endDate.value.split("/")[1]);
    const endMonth = parseInt(endDate.value.split("/")[0]);
    console.log("===========Months between Start and End Date=============");
    yearRow = "";
    monthRow = "";
    for (let year = startYear; year <= endYear; year++) {
      const start = year === startYear ? startMonth : 1;
      const end = year === endYear ? endMonth : 12;
      yearRow += `<th colspan="${end - start + 1}">${year}</th>`;
      for (let month = start; month <= end; month++) {
        monthRow += "<th>" + enum_months[month] + "</th>";
      }
    }
    $("#year-head").append(yearRow);
    $("#month-subhead").append(monthRow);

    //$("#input-from").val() catch input form value
  });

  clearBtn.addEventListener("click", function () {
    alert("Delete all filter");
    // Clear all filter inputs here
    const inputFields = document.querySelectorAll(".filter-item input");
    inputFields.forEach((input) => (input.value = ""));
    const selectField = document.querySelector(".filter-item select");
    selectField.selectedIndex = 0;
    const selectTrigger = document.querySelector(".select-trigger");
    selectTrigger.innerText = "---none---";
  });
});

// Define the function to convert date
function convertDate(element) {
  // Convert the integer value from the element to a Date object
  var date = new Date(parseInt(element) * 1000);

  // Get the month and year
  var month = date.getMonth() + 1; // Note: months start from 0
  var year = date.getFullYear();

  // Add leading zero to month if needed
  if (month < 10) {
    month = "0" + month;
  }
  // Update the element's text content with the formatted date (mm/yyyy)
  return month + "/" + year;
}
// Function to toggle the icon class
function toggleIconClass(icon) {
  if (icon.classList.contains("fa-arrow-up-wide-short")) {
    icon.classList.remove("fa-arrow-up-wide-short");
    icon.classList.add("fa-arrow-down-wide-short");
  } else {
    icon.classList.remove("fa-arrow-down-wide-short");
    icon.classList.add("fa-arrow-up-wide-short");
  }
}

// Add click event listener to each sort icon
document.querySelectorAll("i.sort").forEach(function (icon) {
  icon.addEventListener("click", function () {
    toggleIconClass(icon);
  });
});

//LAZY LOADING
/*$(document).ready(function () {
  var limit = 40;
  var offset = 0;
  var isLoading = false; // Flag to prevent multiple simultaneous requests
  var endOfData = false; // Flag to track if the end of data has been reached

  function loadData() {
    if (isLoading || endOfData) return;
    isLoading = true;

    $.ajax({
      url: "/load_data",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ limit: limit, offset: offset }),
      success: function (response) {
        // Check if the response status indicates no more data
        if (response.status === "No more data") {
          // Mark the end of data
          endOfData = true;
          $("#no-data").append("No more data");
          $("#no-data-icon").css("display", "block");
        } else {
          response = response.data;

          response.forEach(function (row) {
            var newRow = "<tr>";
            // Convert timestamp to date
            newRow += "<td id='r-date'>" + convertDate(row["date"]) + "</td>";
            newRow += "<td id='r-project'>" + row["project_id"] + "</td>";
            newRow += "<td id='r-task'>" + row["task_id"] + "</td>";
            // newRow += "<td>" + row["mcr_id"] + "</td>";
            // newRow += "<td>" + row["employee_id"] + "</td>";
            newRow += "<td id='r-name'>" + row["employee_name"] + "</td>";
            // newRow += "<td>" + row["group_name"] + "</td>";
            newRow += "<td id='r-effort'>" + row["effort"] + "</td>";
            // newRow += "<td>" + (row["remark"] ? row["remark"] : "N/A") + "</td>";
            newRow += "</tr>";
            $("#billing-table-data").append(newRow);
          });
          offset += limit;
          isLoading = false; // Reset flag
        }
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  }

  // Load initial data
  loadData();

  // Lazy loading on scroll
  $(window).scroll(function () {
    // Check if user has scrolled to the bottom of the page
    if (
      $(window).scrollTop() + $(window).height() >=
      $(document).height() - 100
    ) {
      loadData();
    }
  });
});*/

// // Retrieve the scroll-to-top button element from the DOM
// const btnScrollToTop = document.getElementById("scroll-to-top-btn");

// // Retrieve the root element of the document (usually <html>)
// const docEl = document.documentElement;

// // Add an event listener to the document for scroll events
// document.addEventListener("scroll", () => {
//   // Check if the current scroll position is at least 10px of the total scrollable height
//   if (docEl.scrollTop >= 10) {
//     // If true, reveal the scroll-to-top button by setting its hidden property to false
//     btnScrollToTop.hidden = false;
//   } else {
//     // If false, hide the scroll-to-top button by setting its hidden property to true
//     btnScrollToTop.hidden = true;
//   }
// });
//This function use to create fplit table in HTML
Split(["#split-left", "#split-right"], {
  sizes: [25, 75], // Initial size ratio of the splits
  minSize: 200, // Minimum size of each split in pixels
  gutterSize: 10, // Size of the splitter gutter in pixels
  gutterAlign: "start", // Alignment of the splitter gutter (start, center, end)
});
//This function use for click on .default tr you can see the detail of code
$(document).ready(function ($) {
  $(".default").click(function () {
    var index = $(this).index();
    if (index !== 0) {
      index -= 1;
    }
    $("#information-table .default:eq(" + index + ")")
      .toggleClass("active")
      .closest("tr")
      .next()
      .find(".detail-table")
      .slideToggle("fast", function () {
        $(this).closest(".toggle-row").scrollTop(0);
      });

    $("#effort-table .default:eq(" + index + ")")
      .toggleClass("active")
      .closest("tr")
      .next()
      .find(".detail-table")
      .slideToggle("fast", function () {
        $(this).closest(".toggle-row").scrollTop(0);
      });
  });
});

/* */

// //THIS USE FOR TEST IMPORT DATA FROM JSON
// var dummy_json = [
//   {
//     project_id: "MS-300040",
//     bill: [
//       {
//         date: "1704067200",
//         effort: 22.91,
//       },
//       {
//         date: "1706745600",
//         effort: 25.51,
//       },
//     ],
//     resources: [
//       {
//         employee_id: "33514199",
//         employee_name: "Le Minh Nhan",
//         bill: [
//           {
//             date: "1704067200",
//             effort: 1.0,
//           },
//           {
//             date: "1706745600",
//             effort: 0.51,
//           },
//         ],
//       },
//       {
//         employee_id: "EXT",
//         employee_name: "Le Thanh Tuan",
//         bill: [
//           {
//             date: "1704067200",
//             effort: 0.82,
//           },
//           {
//             date: "1706745600",
//             effort: 1.0,
//           },
//         ],
//       },
//       {
//         employee_id: "33517659",
//         employee_name: "Dao Xuan Truong",
//         bill: [
//           {
//             date: "1704067200",
//             effort: 1.0,
//           },
//           {
//             date: "1706745600",
//             effort: 0.73,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     project_id: "MS-300812",
//     bill: [
//       {
//         date: "1704067200",
//         effort: 30.0,
//       },
//       {
//         date: "1706745600",
//         effort: 29.12,
//       },
//     ],
//     resources: [
//       {
//         employee_id: "EXT",
//         employee_name: "Tran Quoc Huy",
//         bill: [
//           {
//             date: "1704067200",
//             effort: null,
//           },
//           {
//             date: "1706745600",
//             effort: 0.0,
//           },
//         ],
//       },
//       {
//         employee_id: "33517012",
//         employee_name: "Vu Hoang Nam",
//         bill: [
//           {
//             date: "1704067200",
//             effort: 1.0,
//           },
//           {
//             date: "1706745600",
//             effort: 0.69,
//           },
//         ],
//       },
//     ],
//   },
// ];
// const startYear = parseInt(startDate.value.split("/")[1]);
// const startMonth = parseInt(startDate.value.split("/")[0]);
// const endYear = parseInt(endDate.value.split("/")[1]);
// const endMonth = parseInt(endDate.value.split("/")[0]);
// console.log("===========Months between Start and End Date=============");
// yearRow = "";
// monthRow = "";
// for (let year = startYear; year <= endYear; year++) {
//   const start = year === startYear ? startMonth : 1;
//   const end = year === endYear ? endMonth : 12;
//   yearRow += `<th colspan="${end - start + 1}">${year}</th>`;
//   for (let month = start; month <= end; month++) {
//     monthRow += "<th>" + enum_months[month] + "</th>";
//   }
// }
// $("#year-head").append(yearRow);
// $("#month-subhead").append(monthRow);

// // READ DUMMY DATA
// for (var i = 0; i < dummy_json.length; i++) {
//   var project_id = dummy_json[i].project_id;
//   var billing_data = dummy_json[i].bill;
//   var resources_data = dummy_json[i].resources;
//   var info_text = "";
//   var effort_text = "";

//   info_text += "<tr class='default'>";
//   info_text += "<td><i class='fa-solid fa-caret-down'></i></td>";
//   info_text += "<td id='project-col'>" + project_id;
//   info_text += "</td></tr>";

//   var date_data = [];
//   var effort_data = [];

//   for (var bill of billing_data) {
//     var dates = bill.date;
//     var effort = bill.effort;

//     date_data.push(convertDate(dates));
//     effort_data.push(effort);
//   }
//   effort_text += "<tr class='default'>";
//   for (var effort of effort_data) {
//     effort_text += "<td>" + (effort/155).toFixed(2) + "</td>";
//   }
//   effort_text += "</tr>";

//   effort_text += $("#information-table tbody").append(info_text);
//   $("#effort-table tbody").append(effort_text);
//   console.log("Project ID:", date_data);
// }

// function createDateEffortTable(date_data){
// const startYear = parseInt(date_data[0].split("/")[1]);
// const startMonth = parseInt(date_data[0].split("/")[0]);
// const endYear = parseInt(date_data[date_data.length - 1].split("/")[1]);
// const endMonth = parseInt(date_data[date_data.length - 1].split("/")[0]);

// yearRow = "";
// monthRow = "";
// for (let year = startYear; year <= endYear; year++) {
//   const start = year === startYear ? startMonth : 1;
//   const end = year === endYear ? endMonth : 12;
//   yearRow += `<th colspan="${end - start + 1}">${year}</th>`;
//   for (let month = start; month <= end; month++) {
//     monthRow += "<th>" + enum_months[month] + "</th>";
//   }
// }
// $("#year-head").append(yearRow);
// $("#month-subhead").append(monthRow);
// }
// createDateEffortTable(date_data);
$(document).ready(function () {
  // Khi hover vào dòng tr.default của #information-table
  $("tr.default").hover(
    function () {
      var index = $(this).index();
      // Hover dòng tương ứng trong #effort-table
      $("#effort-table tr.default").eq(index).addClass("hovered");
      $("#information-table tr.default").eq(index).addClass("hovered");
    },
    function () {
      // Khi rời chuột, loại bỏ class hovered
      $("#effort-table tr.default").removeClass("hovered");
      $("#information-table tr.default").removeClass("hovered");
    }
  );
  $("#detail-table tr").hover(
    function () {
      var index = $(this).index() + 1;
      // Hover dòng tương ứng trong #effort-table
      $("#effort-table #detail-table tr").eq(index).addClass("hovered");
      $("#information-table #detail-table tr").eq(index).addClass("hovered");
    },
    function () {
      // Khi rời chuột, loại bỏ class hovered
      $("#effort-table #detail-table tr").removeClass("hovered");
      $("#information-table #detail-table tr").removeClass("hovered");
    }
  );
});
