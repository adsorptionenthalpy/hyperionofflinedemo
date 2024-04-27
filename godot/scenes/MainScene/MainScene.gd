extends Control

var landscape_orientation: bool = true

func _ready() -> void:
	get_viewport().size_changed.connect(_on_viewport_size_changed)

## Switch between landscape or portrait mode
func _on_viewport_size_changed() -> void:
	if get_window().size.x >= 1920:
		get_window().content_scale_factor = 1.25
	else:
		get_window().content_scale_factor = 1
	
	if get_window().size.x < get_window().size.y + 200 and landscape_orientation:
		landscape_orientation = false
		$HBoxContainer/Padding.size_flags_stretch_ratio = 0
		$HBoxContainer/Padding2.size_flags_stretch_ratio = 0
		%WelcomeText["theme_override_font_sizes/normal_font_size"] = 32
		$HBoxContainer/BackgroundPanel/MainMarginContainer/MainPanel/HBoxContainer/RightSide.visible = false
		
		%MainMarginContainer.add_theme_constant_override("margin_left", 0)
		%MainMarginContainer.add_theme_constant_override("margin_top", 0)
		%MainMarginContainer.add_theme_constant_override("margin_right", 0)
		%MainMarginContainer.add_theme_constant_override("margin_bottom", 0)
		
		%MainPanel["theme_override_styles/panel"].set_corner_radius_all(0)
	
	elif get_window().size.x > get_window().size.y + 200 and !landscape_orientation:
		landscape_orientation = true
		$HBoxContainer/Padding.size_flags_stretch_ratio = 0.25
		$HBoxContainer/Padding2.size_flags_stretch_ratio = 0.25
		%WelcomeText["theme_override_font_sizes/normal_font_size"] = 48
		$HBoxContainer/BackgroundPanel/MainMarginContainer/MainPanel/HBoxContainer/RightSide.visible = true
		
		%MainMarginContainer.add_theme_constant_override("margin_left", 75)
		%MainMarginContainer.add_theme_constant_override("margin_top", 100)
		%MainMarginContainer.add_theme_constant_override("margin_right", 75)
		%MainMarginContainer.add_theme_constant_override("margin_bottom", 100)
		
		%MainPanel["theme_override_styles/panel"].set_corner_radius_all(20)

# ----- Welcome Functions -----

## Show second vbox when signing up
func _on_sign_up_button_pressed() -> void:
	if %EmailSignupLineEdit.text.is_empty():
		return
	
	var tween: Tween = create_tween().set_parallel(true)
	tween.tween_property(%SignInText, "modulate:a", 0, 0.3)
	await tween.tween_property(%WelcomeVBox, "modulate:a", 0, 0.3).finished
	%WelcomeVBox.visible = false
	
	%SecondVBox.visible = true
	%SecondVBox.modulate.a = 0
	
	await get_tree().create_timer(0.25).timeout
	
	tween = create_tween()
	tween.tween_property(%SecondVBox, "modulate:a", 1, 0.3)

func _on_email_signup_line_edit_text_submitted(_new_text: String) -> void:
	_on_sign_up_button_pressed()

# ----- Second Vbox Functions -----

func _on_handle_line_edit_text_changed(new_text: String) -> void:
	if new_text.is_empty():
		%FinalHandleText.self_modulate.a = 0
	else:
		%FinalHandleText.self_modulate.a = 1
	
	if %DomainLineEdit.text.is_empty():
		new_text += "@hyperion"
	else:
		new_text += "@%s" % %DomainLineEdit.text
	
	%FinalHandleText.text = "[center]Your final handle is...\n%s" % new_text

func _on_domain_line_edit_text_changed(_new_text: String) -> void:
	_on_handle_line_edit_text_changed(%HandleLineEdit.text)

func _on_second_vbox_continue_pressed() -> void:
	if %HandleLineEdit.text.is_empty():
		return
	
	var tween: Tween = create_tween()
	await tween.tween_property(%SecondVBox, "modulate:a", 0, 0.3).finished
	%SecondVBox.visible = false
	
	%ThirdVBox.visible = true
	%ThirdVBox.modulate.a = 0
	
	%RegisterText1.text = "[center]Creating wallets for %s" % %FinalHandleText.text.split('\n')[-1]
	
	await get_tree().create_timer(0.1).timeout
	
	tween = create_tween()
	tween.tween_property(%ThirdVBox, "modulate:a", 1, 0.3)

# ----- Third VBox Functions -----

func _on_third_v_box_continue_pressed() -> void:
	var tween: Tween = create_tween().set_parallel(true)
	await tween.tween_property(%ThirdVBox, "modulate:a", 0, 0.3).finished
	%ThirdVBox.visible = false
	
	%WelcomeVBox.visible = true
	%WelcomeVBox.modulate.a = 0
	
	await get_tree().create_timer(0.1).timeout
	
	tween = create_tween()
	tween.tween_property(%SignInText, "modulate:a", 1, 0.3)
	tween.tween_property(%WelcomeVBox, "modulate:a", 1, 0.3)
	
