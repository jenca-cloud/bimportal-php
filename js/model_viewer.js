	$(function(){

		var model_viewer = $('#model-viewer');

		// find a query string parameter (or add it) and change it's value
		function update_url_param(url, name, value){
			var url_parts = url.split('?'),
				query_string_parts = (url_parts[1] != undefined ? url_parts[1].split('&') : []),
				name_regexp = new RegExp('^'+name),
				found = false;


			$.each(query_string_parts, function(i,e){
				if(name_regexp.test(e)){
					query_string_parts[i] = name + '=' + value;
					found=true;
				}
			});

			if(!found)
				query_string_parts.push(name + '=' + value);

			url_parts[1] = query_string_parts.join('&');

			return url_parts.join('?');
		}


		// search the url for a query string parameter and set it to null
		// then rebuild the url and return it
		function remove_url_param(url, name){
			var url_parts = url.split('?'),
				query_string_parts = (url_parts[1] != undefined ? url_parts[1].split('&') : []),
				name_regexp = new RegExp('^'+name);


			$.each(query_string_parts, function(i,e){
				if(name_regexp.test(e)){
					query_string_parts[i] = null;
				}
			});

			url_parts[1] = query_string_parts.join('&');

			return url_parts.join('?');
		}

		// attach event to model selector dropdown
		var project_model_selector = $('select#project-model');
		if(project_model_selector.size() >0){
			project_model_selector.change(function(e){
				var new_url = update_url_param(window.location.href, 'model', $(this).val());
				new_url = remove_url_param(new_url, 'revision');
				
				window.location.href = new_url;
			});
		}

		// attach event to revision selector dropdown
		var model_revision_selector = $('select#model-revision');
		if(model_revision_selector.size() >0){
			model_revision_selector.change(function(e){
				window.location.href = update_url_param(window.location.href, 'revision', $(this).val());
			});
		}

		// show all objects for the current model
		var show_button = $('#viewer-show');
		if(show_button.size() >0){
			show_button.click(function(e){
				model_viewer.viewer('showall');
			});
		}

		// hide the currently selected object(s)
		var hide_button = $('#viewer-hide');
		if(hide_button.size() >0){
			hide_button.click(function(e){
				model_viewer.viewer('eachselected', function(id){
					$(this).viewer('hide', id);
				});
			});
		}

		// listen for the right mouse button and load the info window for the object under the curser
		model_viewer.bind('viewer.contextmenu', function(event, selected) {
		    // load info
		});
	});