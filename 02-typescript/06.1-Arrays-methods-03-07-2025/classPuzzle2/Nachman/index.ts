let input = prompt("Nachman, yatir, tal, ariel. type the name with only 3 chars:");
if (input) {
    console.log(
        input
            .split(",")                         
            .map(name => name.trim())  
            .sort()         
            .filter(name => name.length === 3)  
                                        
    );
}
