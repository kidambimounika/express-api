var express = require('express');
var router = express.Router();
var blog = require('../model/blogModel');

/*

/projects               GET   (list all projects)
/projects/alias         GET   (Get by alias)
/projects               POST  (Create a new project)
/projects/alias         PUT   (Update the project)
/projects/alias         DELETE (remove a project)

*/

function urlify(str) {
	var urlifyStr = str.trim().toLowerCase();
	urlifyStr = urlifyStr.replace(/ /g, '-');
	// handle for ? & - 
	return urlifyStr;
}

/* GET all blog listing. */
router.get('/', function (req, res, next) {
	blog.find({}, function (err, blog) {
		if (err) {
			console.log(JSON.stringify(err));
			res.json({ code: 500, message: 'Something went wrong' });
		} else {
			res.json({ code: 200, data: blog });
		}
	});
});


// /* Create project. */
// router.post('/', function (req, res, next) {
//   var project = req.body;
//   console.log('---create project---');
//   var projectModel = new Project();
//   projectModel.name = project.name;
//   projectModel.alias = urlify(project.name);
//   projectModel.githubUrl = project.githubUrl;
//   projectModel.image = project.image;
//   projectModel.description = project.description;
//   projectModel.tags = [];

//   // var tags = project.tags.trim();
//   // tags = tags.split(',');
//   // for(var i=0; i<tags.length; i++){
//   //     projectModel.tags.push({'name':tags[i], 'class': 'info' });
//   // }

//   projectModel.imageSliders = project.imageSliders;
//   projectModel.relatedProjects = project.relatedProjects;
//   projectModel.createAt = new Date();
//   projectModel.save(function (err, project) {
//     console.log(JSON.stringify(project));
//     if (err) {
//       res.json({ code: 500, message: 'Something went wrong' });
//     } else {
//       res.json({ code: 200, data: project });
//     }
//   });
// });



/* GET project by alias. */
router.get('/:blogAlias', function (req, res, next) {
	blog.findOne({ 'alias': req.params.blogAlias }, function (err, blog) {
		console.log(blog);
		if (err) {
			res.json({ code: 500, message: 'Something went wrong' });
		} else {
			res.json({ code: 200, data: blog });
		}
	});
});

/* Create blog. */
router.put('/:blogAlias', function (req, res, next) {
	var bObject = req.body;

	blog.findOne({ 'alias': blogAlias }, function (err, blog) {
		if (err) {
			callback(err, null);
		} else {

			console.log(JSON.stringify(blog));
			if (bObject.name) {
				blog.name = bObject.name;
			}
			if (bObject.image) {
				blog.image = bObject.image;
			}
			if (bObject.description) {
				blog.description = bObject.description;
			}
			if (bObject.githubUrl) {
				blog.githubUrl = bObject.githubUrl;
			}

			blog.save(function (err, blog) {
				console.log(JSON.stringify(blog));
				if (err) {
					res.json({ code: 500, message: 'Something went wrong' });
				} else {
					res.json({ code: 200, data: blog });
				}
			});
		}
	});
});

/* Create blog. */
router.delete('/:blogAlias', function (req, res, next) {
	blog.remove({ 'alias': req.params.blogAlias }, function (err, blog) {
		if (err) {
			res.json({ code: 500, message: 'Something went wrong' });
		} else {
			res.json({ code: 200, data: blog });
		}
	});
});

module.exports = router;