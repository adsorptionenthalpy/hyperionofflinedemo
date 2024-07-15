extends TextureRect

@export var rotation_speed: float = 300

func _process(delta: float) -> void:
	rotation_degrees += rotation_speed * delta
