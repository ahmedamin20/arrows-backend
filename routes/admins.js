const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../helpers/jwtHelpers');
const adminsRouter = require('./admin/admins');
const homeBannerRouter = require('./admin/homeBanners');
const faqRouter = require('./admin/faqs');
const pageRouter = require('./admin/pages');
const rolesRouter = require('./admin/roles');
const usersRouter = require('./admin/users');
const servciesRouter = require('./admin/services');
const ourServicesRouter = require('./admin/ourServices')
const partnersRouter = require('./admin/partners')
const ourTeamRouter = require('./admin/ourTeam');
const headerRouter = require('./admin/headerContent');
const footerRouter = require('./admin/footer');
const philosphyRouter = require('./admin/philosphy');
const testimonialsRouter = require('./admin/testimonials');
const blogsRouter = require('./admin/blogs');
const casestudyRouter = require('./admin/casestudy');
const servicesRouter = require('./admin/services');
const subServicesRouter = require('./admin/subServices');
const howItWorksRouter = require('./admin/howItWorks');
const aboutUsRouter = require('./admin/aboutUs');
const contactUSRouter = require('./admin/contactUs');
const contactusInfoRouter = require('./admin/contactusInfo');
const letsTalkRouter = require('./admin/letstalk');
const subProjectRouter = require('./admin/projects');

router.use('/home-banner', verifyAccessToken, homeBannerRouter);
router.use('/faq', verifyAccessToken, faqRouter);
router.use('/pages',verifyAccessToken,pageRouter)
router.use('/roles', verifyAccessToken, rolesRouter);
router.use('/services',verifyAccessToken, servciesRouter);
router.use('/partners',verifyAccessToken, partnersRouter);
router.use('/ourServcies',verifyAccessToken,ourServicesRouter);
router.use('/ourTeam',verifyAccessToken,ourTeamRouter);
router.use('/header-content',verifyAccessToken,headerRouter);
router.use('/footer-details',verifyAccessToken,footerRouter);
router.use('/philosphy',philosphyRouter);
router.use('/testimonials',verifyAccessToken,testimonialsRouter);
router.use('/blogs',verifyAccessToken,blogsRouter);
router.use('/caseStudy',verifyAccessToken,casestudyRouter);
router.use('/services',verifyAccessToken,servicesRouter);
router.use('/subServices',verifyAccessToken,subServicesRouter);
router.use('/howItWorks',verifyAccessToken,howItWorksRouter);
router.use('/about-us',verifyAccessToken,aboutUsRouter);
router.use('/contact-us-info',verifyAccessToken,contactusInfoRouter);
router.use('/letsTalk',verifyAccessToken,letsTalkRouter);
router.use('/contact-us-requests',verifyAccessToken,contactUSRouter);
router.use('/projects',subProjectRouter);

router.use('/users', usersRouter);
router.use('/', adminsRouter);

module.exports = router;