@tool
extends EditorPlugin

# Simple WakaTime integration for Godot 4.4
var api_key: String = ""
var last_file: String = ""
var last_time: int = 0
var start_time: int = 0
var time_label: Label

func _enter_tree():
	print("🎮 Simple WakaTime tracker starting...")
	start_time = Time.get_unix_time_from_system()

	create_time_display()

	var editor_settings = EditorInterface.get_editor_settings()
	if editor_settings.has_setting("wakatime/api_key"):
		api_key = editor_settings.get_setting("wakatime/api_key")
		print("✅ WakaTime API key found!")

		# Connect to script editor signals
		var script_editor = EditorInterface.get_script_editor()
		if script_editor.connect("editor_script_changed", _on_script_changed) == OK:
			print("📝 Script tracking enabled")

		# Start periodic heartbeat
		create_timer()
	else:
		print("⚠️ No WakaTime API key found. Please set it first.")

func _exit_tree():
	print("👋 WakaTime tracker stopped")
	if time_label:
		remove_control_from_bottom_panel(time_label)

func create_time_display():
	time_label = Label.new()
	time_label.text = "⏱️ WakaTime: 0m"
	add_control_to_bottom_panel(time_label, "WakaTime")

	# Update timer for display
	var display_timer = Timer.new()
	display_timer.wait_time = 1.0  # Update every second
	display_timer.timeout.connect(_update_display)
	display_timer.autostart = true
	add_child(display_timer)

func _update_display():
	if time_label:
		var elapsed = Time.get_unix_time_from_system() - start_time
		var minutes = int(elapsed / 60)
		var hours = int(minutes / 60)
		minutes = minutes % 60

		if hours > 0:
			time_label.text = "⏱️ WakaTime: %dh %dm" % [hours, minutes]
		else:
			time_label.text = "⏱️ WakaTime: %dm" % minutes

func create_timer():
	var timer = Timer.new()
	timer.wait_time = 30.0  # Send heartbeat every 30 seconds
	timer.timeout.connect(_send_heartbeat)
	timer.autostart = true
	add_child(timer)

func _on_script_changed(script: Script):
	if script and script.resource_path:
		var current_file = script.resource_path
		if current_file != last_file:
			last_file = current_file
			_track_file(current_file, false)

func _send_heartbeat():
	if last_file != "":
		_track_file(last_file, true)

func _track_file(filepath: String, is_write: bool):
	if api_key == "":
		return

	var current_time = Time.get_unix_time_from_system()

	# Only send if enough time has passed (avoid spam)
	if current_time - last_time < 10 and not is_write:
		return

	last_time = current_time

	print("📊 Tracking: " + filepath.get_file())

	# This is where you'd normally send to WakaTime API
	# For now, just log the activity
	var activity_type = "coding" if filepath.get_extension() == "gd" else "editing"
	print("   └── Activity: " + activity_type + " (" + str(current_time) + ")")
