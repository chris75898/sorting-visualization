exports.name = "Bubble";
exports.run = async function(currentThis) {
  var finalColumn = currentThis.records.length;

      while (finalColumn >= 1) {
        finalColumn--;
        for (var i = 0; i <= finalColumn; i++) {
          var current = currentThis.records[i];
          var next = currentThis.records[i + 1];
          currentThis.setFocus(i, i + 1 <= finalColumn ? i + 1 : null);
          if (next) {
            if ((await currentThis.compare(i, i + 1)) == 1) await currentThis.swap(i, i + 1);
          }

          if (finalColumn == i) current.isDone = true;
        }
      }
}