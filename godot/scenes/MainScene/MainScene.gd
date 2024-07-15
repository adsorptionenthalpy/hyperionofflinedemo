extends Control

var landscape_orientation: bool = true

func _ready() -> void:
	get_viewport().size_changed.connect(_on_viewport_size_changed)
	
	if OS.has_feature("android"):
		if DisplayServer.screen_get_orientation(0) == DisplayServer.SCREEN_LANDSCAPE:
			set_android_landscape_mode()
	
	#get_window().size = Vector2i(2400, 1080)
	#set_android_landscape_mode()
	#get_window().content_scale_factor = 2

## Switch between landscape or portrait mode, adjust scale after
func _on_viewport_size_changed() -> void:
	var window_size: Vector2i = get_window().size
	
	if get_window().size.x < get_window().size.y + 200 and landscape_orientation:
		set_portrait_mode()
	
	elif get_window().size.x > get_window().size.y + 200 and !landscape_orientation:
		set_landscape_mode()
	
	if landscape_orientation:
		if window_size.x >= 3840:
			get_window().content_scale_factor = 2
		elif window_size.x >= 2560:
			get_window().content_scale_factor = 1.75
		elif window_size.x >= 1920:
			get_window().content_scale_factor = 1.5
		else:
			get_window().content_scale_factor = 1
	else:
		get_window().content_scale_factor = 2.25

func set_portrait_mode():
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

func set_android_landscape_mode():
	landscape_orientation = true
	$HBoxContainer/Padding.size_flags_stretch_ratio = 0.05
	$HBoxContainer/Padding2.size_flags_stretch_ratio = 0.05
	$HBoxContainer/BackgroundPanel/MainMarginContainer/MainPanel/HBoxContainer/RightSide.visible = true
		
	%MainMarginContainer.add_theme_constant_override("margin_left", 75)
	%MainMarginContainer.add_theme_constant_override("margin_top", 25)
	%MainMarginContainer.add_theme_constant_override("margin_right", 75)
	%MainMarginContainer.add_theme_constant_override("margin_bottom", 25)

func set_landscape_mode():
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
	
	new_text += "@hyperion"
	
	%FinalHandleText.text = "[center]Your final handle is...\n%s" % new_text.to_lower()

func _on_domain_line_edit_text_changed(_new_text: String) -> void:
	_on_handle_line_edit_text_changed(%HandleLineEdit.text.to_lower())

func _on_second_vbox_continue_pressed() -> void:
	if %HandleLineEdit.text.is_empty():
		return
	
	var tween: Tween = create_tween()
	await tween.tween_property(%SecondVBox, "modulate:a", 0, 0.3).finished
	%SecondVBox.visible = false
	
	%ThirdVBox.visible = true
	%ThirdVBox.modulate.a = 0
	
	%CreateWalletText.text = "[center]Creating wallets for %s" % %FinalHandleText.text.split('\n')[-1]
	
	await get_tree().create_timer(0.1).timeout
	
	play_third_v_box_animation()
	
	tween = create_tween()
	tween.tween_property(%ThirdVBox, "modulate:a", 1, 0.3)

# ----- Third VBox Functions -----

func play_third_v_box_animation() -> void:
	var evm_wallet: String = "0x10e0271ec47d55511a047516f2a7301801d55eab"
	var solana_wallet: String = "hn7cabqlq46es1jh92dqqisaq662smxelllshhe4ywrh"
	var polygon_wallet: String = "0xf2a1246e60a57c899dcd6e5166e246bc5cd7e783"
	var wax_wallet: String = "eos5tda12sdlfjhkdfde1uqbwd6b6wt46bc5cd7e783"
	var fio_wallet: String = "fio8ktpwmh8m4cfrmfu9lapzpih5sq5jkwxzwxfnb"
	
	%CreateWalletText2.modulate.a = 0
	%CreateWalletText2.text = %CreateWalletText2.text.trim_suffix(evm_wallet)
	%CreateWalletText3.visible = false
	%CreateWalletText3.text = %CreateWalletText3.text.trim_suffix(solana_wallet)
	%CreateWalletText4.visible = false
	%CreateWalletText4.text = %CreateWalletText4.text.trim_suffix(polygon_wallet)
	%CreateWalletText5.visible = false
	%CreateWalletText5.text = %CreateWalletText5.text.trim_suffix(wax_wallet)
	%CreateWalletText6.visible = false
	%CreateWalletText6.text = %CreateWalletText6.text.trim_suffix(fio_wallet)
	%ThirdVBoxContinue.modulate.a = 0
	
	await get_tree().create_timer(0.5).timeout
	play_key_load_animation(%CreateWalletText2, evm_wallet)
	
	await get_tree().create_timer(1.5).timeout
	play_key_load_animation(%CreateWalletText3, solana_wallet)
	
	await get_tree().create_timer(1.5).timeout
	play_key_load_animation(%CreateWalletText4, polygon_wallet)
	
	await get_tree().create_timer(1.5).timeout
	play_key_load_animation(%CreateWalletText5, wax_wallet)
	
	await get_tree().create_timer(1.5).timeout
	play_key_load_animation(%CreateWalletText6, fio_wallet)
	
	await get_tree().create_timer(1.5).timeout
	create_tween().tween_property(%ThirdVBoxContinue, "modulate:a", 1, 0.2)

func play_key_load_animation(label: RichTextLabel, wallet_key: String):
	label.visible = true
	label.modulate.a = 0
	label.get_child(0).visible = true
	create_tween().tween_property(label, "modulate:a", 1, 0.2)
	
	await get_tree().create_timer(0.75).timeout
	for char: String in wallet_key.split(''):
		label.text += char
		await get_tree().physics_frame
	
	label.get_child(0).visible = false # Removes loading icon

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
	
