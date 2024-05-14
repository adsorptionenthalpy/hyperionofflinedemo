extends Node

## Sets some global values, like minimum window size

func _ready() -> void:
	DisplayServer.window_set_min_size(Vector2i(480, 360))
	
	if OS.has_feature("android"):
		get_window().content_scale_factor = 2
		if get_window().size.y >= 1440:
			get_window().content_scale_factor = 2.25
		elif get_window().size.y >= 2160:
			get_window().content_scale_factor = 2.75
