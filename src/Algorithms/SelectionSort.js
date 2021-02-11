exports.name = "Selection";

exports.run = async function(currentThis) {
    for (var i = 0; i < currentThis.records.length; i++) {
        //assume min is the first element
        var minIndex = i;

        for (var j = i + 1; j < currentThis.records.length; j++) {
          if ((await currentThis.compare(minIndex, j)) == 1) minIndex = j;
        }

        if (minIndex != i) currentThis.swap(i, minIndex);
        currentThis.records[i].isDone = true;
      }
}