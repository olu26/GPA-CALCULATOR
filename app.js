// Service Worker Registration
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("../sw_cached_pages.js")
            .then((reg) => console.log("Service worker: Registered"))
            .catch((err) => console.log(`Server Worker: Error: ${err}`));
    });
  }
  
  const add = document.getElementById("add");
  const calculate = document.getElementById("calculate");
  const gpaBlock = document.getElementById("gpaBlock");
  const myGpa = document.getElementById("myGpa");
  const myCourses = document.getElementById("myCourses");
  const coursesBox = document.getElementById("coursesInput");
  const listNames = document.getElementById("listNames");
  
  // Grade Points Mapping
  const gradePoints = {
    "A+": 5,
    "A": 5,
    "B+": 4,
    "B": 4,
    "B-": 4,
    "C+": 3,
    "C": 3,
    "D+": 2,
    "D": 2,
    "E": 1,
    "F": 0,
  };
  
  // Function to add course input fields
  function addCourse() {
    const course = document.createElement("div");
    course.className = "text-center py-2";
    coursesBox.appendChild(course);
  
    const row = document.createElement("div");
    row.classList.add("form-row");
    course.appendChild(row);
  
    const courseNameInput = document.createElement("div");
    courseNameInput.classList.add("col-5");
    const nameInput = document.createElement("input");
    nameInput.className = "form-control namo";
    nameInput.placeholder = "Course (optional)";
    nameInput.type = "text";
    courseNameInput.appendChild(nameInput);
    row.appendChild(courseNameInput);
  
    const creditInput = document.createElement("div");
    creditInput.classList.add("col");
    const credit = document.createElement("input");
    credit.className = "form-control credito";
    credit.placeholder = "Credits";
    credit.type = "number";
    creditInput.appendChild(credit);
    row.appendChild(creditInput);
  
    const gradeSelect = document.createElement("div");
    gradeSelect.classList.add("col");
    const select = document.createElement("select");
    select.name = "grade";
    select.className = "form-control grades";
    const defaultOption = document.createElement("option");
    defaultOption.attributes = "disabled selected";
    defaultOption.innerHTML = "Grade";
    select.appendChild(defaultOption);
  
    // Add grade options dynamically
    Object.keys(gradePoints).forEach((grade) => {
        const option = document.createElement("option");
        option.value = grade;
        option.innerHTML = grade;
        select.appendChild(option);
    });
  
    gradeSelect.appendChild(select);
    row.appendChild(gradeSelect);
  }
  
  add.addEventListener("click", addCourse);
  
  // Function to calculate GPA
  function calculateGpa() {
    gpaBlock.style.display = "block";
    listNames.innerHTML = "";
  
    const courseNames = document.querySelectorAll(".namo");
    const credits = document.querySelectorAll(".credito");
    const grades = document.querySelectorAll(".grades");
  
    courseNames.forEach((course, index) => {
        let item = course.value;
        let itemGrade = grades[index].value;
        let newItem = document.createElement("p");
        if (itemGrade === "Grade") {
            newItem.innerHTML = item;
        } else {
            newItem.innerHTML = item + "(" + itemGrade + ")";
        }
  
        if (course.value == "") {
            newItem.innerHTML = "";
        }
        listNames.appendChild(newItem);
    });
  
    if (listNames.innerText === "") {
        listNames.style.lineHeight = "22px";
        listNames.innerHTML =
            "this section displays your courses name with their GPA. You didn't add a name to any of your courses. <u>Fill in the course name input box to view your courses here.</u>";
    }
  
    let totalGpaPoints = 0;
    let totalCredits = 0;
  
    grades.forEach((grade, index) => {
        const creditValue = Number(credits[index].value);
        const gradeValue = grade.value;
        if (gradeValue !== "Grade") {
            const gpaPoints = creditValue * gradePoints[gradeValue];
            totalGpaPoints += gpaPoints;
            totalCredits += creditValue;
        }
    });
  
    if (totalCredits > 0) {
        const gpa = (totalGpaPoints / totalCredits).toFixed(2);
        myCourses.innerHTML = "Total Credits: " + totalCredits;
        myGpa.innerHTML = "My GPA: " + gpa;
    } else {
        myCourses.innerHTML = "Total Credits: 0";
        myGpa.innerHTML = "My GPA: N/A";
    }
  }
  
  calculate.addEventListener("click", calculateGpa);
  