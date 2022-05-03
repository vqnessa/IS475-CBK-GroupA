import express from "express"
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import moment from "moment";
import path from "path";
import {
    fileURLToPath
} from 'url';

const app = express();
const PORT = 3000 || process.env.PORT;
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.get('/articlepage', async (req, res) => {
    const db = new sqlite3.Database("./database.db");
    const stmt = "SELECT rowid, * FROM articles";
    db.all(stmt, [], async (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render("articlepage", {
                articles: rows
            })
        }
    });
});

app.get('/collegepage', async (req, res) => {
    const db = new sqlite3.Database("./database.db");
    const stmt = "SELECT rowid, * FROM colleges";
    db.all(stmt, [], async (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render("collegepage", {
                colleges: rows
            })
        }
    });
});

app.get('/resumepage', async (req, res) => {
    const db = new sqlite3.Database("./database.db");
    const stmt = "SELECT rowid, * FROM resume";
    db.all(stmt, [], async (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render("resumepage", {
                resume: rows
            })
        }
    });
});

app.get('/article', async (req, res, next) => {
    res.render('article',{});
});

app.post('/article', async(req, res, next) => {
    const db = new sqlite3.Database("./database.db")
    var article_title = req.body.atitle;
    var article_author = req.body.aauthor;
    var article_date = req.body.adate;
    var article_content = req.body.acontent;
    var source_url = req.body.aurl;

    var college_tag = req.body.actag;
    var resume_tag = req.body.artag;
    var job_tag = req.body.ajtag;
    var scholarship_tag = req.body.astag;

    console.log(article_title, article_author, article_date, article_content, source_url, college_tag, resume_tag, job_tag, scholarship_tag);
    const stmt = 'INSERT INTO articles(atitle, aauthor, adate, acontent, aurl, actag, artag, ajtag, astag, postime) VALUES(?,?,?,?,?,?,?,?,?,?)';
    db.run(stmt, [article_title, article_author, article_date, article_content, source_url, college_tag, resume_tag, job_tag, scholarship_tag, moment().format('MMMM Do YYYY, h:mm:ss a')], function(err, result) {
        if (err) throw err;
        console.log('Article Inserted!');
        res.redirect('/article')
    })
})

app.get('/college', async (req, res, next) => {
    res.render('college',{});
});

app.post('/college', async(req, res, next) => {
    const db = new sqlite3.Database("./database.db")
    var college_name = req.body.cname;
    var college_abbreviation = req.body.cabb;
    var college_location = req.body.clocation;
    var college_gpa_required = req.body.cgpa;
    var college_instate_attendance = req.body.cinstate;
    var college_outstate_attendance = req.body.coutstate;
    var college_majors = req.body.cmajors;
    var college_top3_majors = req.body.ctop3majors;
    var college_enrollment = req.body.cenrollment;
    var college_size = req.body.csize;
    var college_url = req.body.curl;

    console.log(college_name, college_abbreviation, college_location, college_gpa_required, college_instate_attendance, college_outstate_attendance, college_majors, college_top3_majors, college_enrollment, college_size, college_url);
    const stmt = 'INSERT INTO colleges(cname, cabb, clocation, cgpa, cinstate, coutstate, cmajors, ctop3majors, cenrollment, csize, curl, postime) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
    db.run(stmt, [college_name, college_abbreviation, college_location, college_gpa_required, college_instate_attendance, college_outstate_attendance, college_majors, college_top3_majors, college_enrollment, college_size, college_url, moment().format('MMMM Do YYYY, h:mm:ss a')], function(err, result) {
        if (err) throw err;
        console.log('College Inserted!');
        res.redirect('/college')
    })
})

app.get('/job', async (req, res, next) => {
    res.render('job',{});
});

app.post('/job', async(req, res, next) => {
    const db = new sqlite3.Database("./database.db")
    var job_title = req.body.jtitle;
    var job_duties = req.body.jduties;
    var job_education_level = req.body.jedulvl;
    var job_salary = req.body.jsalary;
    var job_outlook = req.body.joutlook;
    var job_url = req.body.jurl;

    console.log(job_title, job_duties, job_education_level, job_salary, job_outlook, job_url);
    const stmt = 'INSERT INTO jobs(jtitle, jduties, jedulvl, jsalary, joutlook, jurl, postime) VALUES(?,?,?,?,?,?,?)';
    db.run(stmt, [job_title, job_duties, job_education_level, job_salary, job_outlook, job_url, moment().format('MMMM Do YYYY, h:mm:ss a')], function(err, result) {
        if (err) throw err;
        console.log('Job Position Inserted!');
        res.redirect('/job')
    })
})

app.get('/resume', async (req, res, next) => {
    res.render('resume',{});
});

app.post('/resume', async(req, res, next) => {
    const db = new sqlite3.Database("./database.db")
    var resume_title = req.body.rtitle;
    var resume_template = req.body.rfile;
    var resume_url = req.body.rurl;

    console.log(resume_title, resume_template, resume_url);
    const stmt = 'INSERT INTO resume(rtitle, rfile, rurl, postime) VALUES(?,?,?,?)';
    db.run(stmt, [resume_title, resume_template, resume_url, moment().format('MMMM Do YYYY, h:mm:ss a')], function(err, result) {
        if (err) throw err;
        console.log('Resume Template Inserted');
        res.redirect('/resume')
    })
})

app.get('/scholarships', async (req, res, next) => {
    res.render('scholarships',{});
});

app.post('/scholarships', async(req, res, next) => {
    const db = new sqlite3.Database("./database.db")
    var scholarship_name = req.body.sname;
    var scholarship_availability = req.body.savailability;
    var scholarship_award = req.body.saward;
    var scholarship_url = req.body.surl;

    console.log(scholarship_name, scholarship_availability, scholarship_award, scholarship_url);
    const stmt = 'INSERT INTO scholarships(sname, savailability, saward, surl, postime) VALUES(?,?,?,?,?)';
    db.run(stmt, [scholarship_name, scholarship_availability, scholarship_award, scholarship_url, moment().format('MMMM Do YYYY, h:mm:ss a')], function(err, result) {
        if (err) throw err;
        console.log('Scholarship Inserted!');
        res.redirect('/scholarships')
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});