exports.name = "Insertion";

exports.run = async function(currentThis) {
    for (var i = 0; i < currentThis.records.length; i++) {
        var currentPointer = i;
        currentThis.setFocus(i);
        while (
          currentPointer > 0 &&
          (await currentThis.compare(currentPointer - 1, currentPointer)) == 1
        ) {
            currentThis.move(currentPointer, currentPointer - 2);
          currentPointer -= 1;
        }
        currentThis.i++;
      }
    for (i=0; i < currentThis.records.length; i++)
    {
        currentThis.records[i].isDone = true;
    }
}