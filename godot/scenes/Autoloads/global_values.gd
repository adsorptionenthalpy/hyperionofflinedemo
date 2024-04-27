extends Node

## Sets some global values, like minimum window size

func _ready() -> void:
	DisplayServer.window_set_min_size(Vector2i(480, 360))
