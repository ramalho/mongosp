var reduce = function (key, values) { 
    var total = 0;
    values.forEach(function(n) { total += n; });
    return total;
}
