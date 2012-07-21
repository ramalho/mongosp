var map = function () {
    if (this.type.key === "/type/edition") {
        for (field_name in this) {
            emit(field_name, 1);
        }
    }
}
