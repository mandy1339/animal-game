//AUTHOR: Armando L. Toledo  //====================================
//Last Updated: 08/03/2017   //====================================
//=================================================================
//=================================================================


// Declare some variables
var node;                       // used to traverse the db tree structure
var path = 'question/mammal';   // used to read and write from the db






// FIREBASE SET UP
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Create configuration object
var config = {
    apiKey: "AIzaSyCQK1UqBY348E88CKP2kuyisWRn29zENEM",
    authDomain: "fireclick2.firebaseapp.com",
    databaseURL: "https://fireclick2.firebaseio.com",
    projectId: "fireclick2",
    storageBucket: "",
    messagingSenderId: "1062287029196"
};

firebase.initializeApp(config);     // Inject configuration into firebase object
console.log(firebase);              // Print the object for success confirmation
var database = firebase.database(); // Initialize the database
var ref = database.ref('question'); // Set up the root of the tree
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++






// FUNCTIONS
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// READNODE()
// arg1 = path as string to desired node in tree ('questions/mammal/left/human')
// arg2 = callback function if needed.
// points our traversing node to a tree node
// -----------------------------------------------------------------
function readNode(path, callback, callback2) {
    (firebase.database().ref(path).once('value')
        .then(function(snapshot) {
            node = snapshot.val();
            callback();
        }))
}


// ISLEAF()
// returns true if current node is a leaf
//------------------------------------------------------------------------
function isLeaf() {
    return (!node.left && !node.right);
}


// DISPLAY TO SCREEN()
// populates the p element with the question from our traverser node
//------------------------------------------------------------------------
function displayToScreen() {
    // if we are at a leaf, add "Is it the " and "?"
    if(isLeaf()){
        document.getElementById('questionP').innerText = 'Is it the ' + node.question + '?';
    }
    else {
        document.getElementById('questionP').innerText = node.question;
    }
}

// DISPLAY TO SCREEN()
// populates the p element with the question from our traverser node
//------------------------------------------------------------------------
function randomId() {
    return Math.random()
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++







// EVENT HANDLING
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// button handlers
document.getElementById('yes-btn').onclick = handleYes;
document.getElementById('no-btn').onclick = handleNo;
document.getElementById('add-btn').onclick = handleAdd;


// HANDLE YES()
// handler for yes button
//------------------------------------------------------------------------
function handleYes(trigger) {
    // if on a leaf, stop
    if(!node.left && !node.right){  
        alert('I did it!! can learn!!!!')
        location.reload();
    }
    
    // if not a leaf, go to left child and update question
    else {
        node = node.left;                           //traverse left
        path += '/left/' + Object.keys(node)[0];    //update path
        node = node[Object.keys(node)[0]];          //descend into real object
        displayToScreen();                          //update question text
    }
}


// HANDLE NO()
// handler for no button
//------------------------------------------------------------------------
function handleNo() {
    // If on a leaf, ask user to type a question that describes their animal
    if(!node.left && !node.right){
        $('#insert-div').removeClass('Invisible');
    }
    // If not a leaf, go to right child and redisplay question
    else {
        node = node.right;                           //traverse right
        path += '/right/' + Object.keys(node)[0];    //update path
        node = node[Object.keys(node)[0]];          //descend into real object
        displayToScreen();                          //update question
    }
}


// HANDLE ADD()
// handler for add button
//------------------------------------------------------------------------
function handleAdd() {
    // if all 2 textfields have been filled, save new entries to database
    if($('textarea')[0].value != "" && $('textarea')[1].value != "") {
        console.log('ready to do work');
    
    var userQuestion = $('textarea')[0].value;
    var userAnimal = $('textarea')[1].value;

    // save the question in current node
    var currentQuestion = node.question;

    // Update the question field of current node with user's new question
    firebase.database().ref(path).update({question: userQuestion});

    // Create new left with the typed animal by the user
    firebase.database().ref(path + '/left/' + 'L').set({question: userAnimal});

    // Create a new right with our saved question (which should be an animal)
    firebase.database().ref(path + '/right/' + 'R').set({question: currentQuestion})
        .then(location.reload());
    }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++







// MAIN
// Initialize state
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
readNode(path, displayToScreen);    // get snapshot object from the db, make node 
                                    // point to it and display first question
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++                                    