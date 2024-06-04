const express = require('express');
const router = express.Router();

const bannersRouter = require('./user/homeBanners');
const partnersRouter = require('./user/partners');
const ourservices = require('./user/ourServices');
const ourTeam = require('./user/ourTeam');
const headerItems = require('./user/headerItems');
const footer = require('./user/footer');
const philosphy = require('./user/philosphy');
const testimonials = require('./user/testimonials');
const blogs = require('./user/blogs');
const caseStudy = require('./user/casestudy');
const services = require('./user/services');
const subServices = require('./user/subServices');
const faq = require('./user/faq');
const aboutUs = require('./user/aboutUs')
const contactUs = require('./user/contactUs')
const contactUSInfo = require('./user/contactUsInfo')
const letsTalk = require('./user/letsTalk')

router.use('/contact-us',contactUs)
router.use('/banners', bannersRouter);
router.use('/partners',partnersRouter);
router.use('/ourservices',ourservices);
router.use('/ourTeam',ourTeam);
router.use('/footer-details',footer);
router.use('/about-us',philosphy)
router.use('/testimonials',testimonials)
router.use('/blogs',blogs)
router.use('/caseStudy',caseStudy)
router.use('/services',services)
router.use('/subServices',subServices)
router.use('/faq',faq)
router.use('/aboutUs',aboutUs)
router.use('/contactUsInfo',contactUSInfo)
router.use('/letsTalk',letsTalk)

module.exports = router;