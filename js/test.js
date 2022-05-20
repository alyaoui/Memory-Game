// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {

    // Prompt Window To Ask For Name
    let yourName = prompt("Whats Your Name?");

    // If Name Is Empty
    if (yourName == null || yourName == "") {

        // Set Name To Unknown
        document.querySelector(".name span").innerHTML = 'Unknown';

        // Name Is Not Empty
    } else {

        // Set Name To Your Name
        document.querySelector(".name span").innerHTML = yourName;

    }
    // Remove Splash Screen
    document.querySelector(".control-buttons").remove();
    document.getElementById('open').play();
    document.getElementById('open').volume = 0.2;
};
//effect duration 
let duration = 1000;
//select blocks  container 
let blocksContainer = document.querySelector('.memory-game-blocks');
//creat array from games blocks
let blocks = Array.from(blocksContainer.children);
//creat range of keys
let orderRange = [...Array(blocks.length).keys()]; //bech n7othem fiarray 
//    let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);
//add order for css property to games blocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    //add click event
    block.addEventListener('click', function () {
        flipBlock(block);
    })
});
//flip block function
function flipBlock(selectedBlock) {
    //add class is-flipped
    selectedBlock.classList.add('is-flipped');
    //collect all flipped cards  
    let allflippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"))
    //if theres two sellected blocks
    if (allflippedBlocks.length === 2) {
        //stoped clicking function
        stopClicking();
        //check matching block function
        checkMatchedBlocks(allflippedBlocks[0], allflippedBlocks[1])
    }
}
//function stop clicking
function stopClicking() {
    //add class no clicking on main container
    blocksContainer.classList.add("no-clicking")
    setTimeout(() => {
        //remove class no-clicking after the duration 
        blocksContainer.classList.remove("no-clicking")
    }, duration);
}
// Check Matched Block
let triesElement = document.querySelector('.tries span');
function checkMatchedBlocks(firstBlock, secondBlock) {
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();
        triesElement.innerHTML = parseInt(triesElement.innerHTML) - 1;

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
       // console.log (parseInt(triesElement.innerHTML))  ;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        }, duration);

        document.getElementById('fail').play();
        stop ();
    }
}
//   shuffle function
function shuffle(array) {
    //settings vars

    let current = array.length,
        temp,
        random;
    while (current > 0) {
        // get random Number
        random = Math.floor(Math.random() * current);
        //decrease length by one
        current--;
        // [1]save current element in stash
        temp = array[current];
        //[2] current element = random element
        array[current] = array[random]
        //[3] random element = Get element from stash
        array[random] = temp;
    }
    return array;
}

function stop ()
{
    
    if (parseInt(triesElement.innerHTML) == 10){
        document.querySelector(".over").style.display="block";
    }
}