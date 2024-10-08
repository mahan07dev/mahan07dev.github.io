function insert(num) {  
    const screen = document.form1.screen;
    const lastChar = screen.value.slice(-1);

    // Split the current value by operators to check the last number
    const parts = screen.value.split(/[\+\-\*\/]/);
    const lastNumber = parts[parts.length - 1];

    // Prevent multiple operators in a row and handle decimal points
    if (isOperator(lastChar) && isOperator(num)) {
        return;
    }
    if (num === '.' && lastNumber.includes('.')) {
        return;
    }

    screen.value += num;
}

function equal() {  
    const screen = document.form1.screen;
    const exp = screen.value;

    try {
        if (exp) {  
            screen.value = eval(exp);  
        }
    } catch (e) {
        screen.value = "Error";
        setTimeout(function() {
            screen.value = "";
        }, 2000); // Clear the error message after 2 seconds
    }
}

function backspace() {  
    const screen = document.form1.screen;
    screen.value = screen.value.slice(0, -1);
}

// Prevent form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
});

// Add event listener for Enter key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === 'NumpadEnter') {
        document.getElementById('input-equal').click();
    }
});

// Helper function to check if a character is an operator
function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

// Clear the screen
function clearScreen() {
    document.form1.screen.value = "";
}

// Handle keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key) || isOperator(key) || key === '.') {
        if (isOperator(key)) {
            insert(` ${key} `);
        } else {
            insert(key);
        }
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Enter' || key === 'NumpadEnter') {
        equal();
    }
});