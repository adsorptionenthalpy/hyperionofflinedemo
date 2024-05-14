extends LineEdit


func _on_text_changed(new_text: String) -> void:
	var caret_pos = caret_column
	text = new_text.to_lower()
	caret_column = caret_pos
