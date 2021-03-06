import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

import Markdown from '../component/Markdown'

// 部落格的內容，純文字檔markdown格式
import post1 from '../content/blog-post.1.md'
import post2 from '../content/blog-post.2.md'
import post3 from '../content/blog-post.3.md'

import { Link } from 'react-router-dom'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    padding: `${theme.spacing.unit * 3}px 0`,
  },
  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing.unit * 3,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
})

const sections = [
  'Technology',
  'Design',
  'Culture',
  'Business',
  'Politics',
  'Opinion',
  'Science',
  'Health',
  'Style',
  'Travel',
]

// 要獲取純文字檔(markdown)檔案的內容，
// 使用fetch來獲取
const fetchMarkdownContent = markdownFilePath => {
  return fetch(markdownFilePath).then(response => response.text())
}

const postPaths = [post1, post2, post3]

const archives = [
  'March 2020',
  'February 2020',
  'January 2020',
  'December 2019',
  'November 2019',
  'October 2019',
  'September 2019',
  'August 2019',
  'July 2019',
  'June 2019',
  'May 2019',
  'April 2019',
]

const social = ['GitHub', 'Twitter', 'Facebook']

class BlogList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { posts: [] }
  }

  // 在元件一開始呈現時，獲取文字檔的內容
  // 這裡用 Promise.all是為了要讓所有陣列裡的文字全部獲取後
  // 再設定state值
  componentDidMount() {
    Promise.all(postPaths.map(post => fetchMarkdownContent(post))).then(
      newPosts => {
        this.setState({
          posts: newPosts,
        })
      }
    )
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.layout}>
          <Toolbar className={classes.toolbarMain}>
            <Button size="small">Subscribe</Button>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              部落格 Blog 範例
            </Typography>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <Button variant="outlined" size="small">
              Sign up
            </Button>
          </Toolbar>
          <Toolbar variant="dense" className={classes.toolbarSecondary}>
            {sections.map(section => (
              <Typography color="inherit" noWrap key={section}>
                {section}
              </Typography>
            ))}
          </Toolbar>
          <main>
            <Grid container spacing={40} className={classes.mainGrid}>
              {/* Main content */}
              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>
                  部落格文章清單
                </Typography>
                <Divider />
                {this.state.posts.map((post, index) => (
                  <div key={index}>
                    <Markdown className={classes.markdown}>
                      {post.substring(0, 200)}
                    </Markdown>
                    {/* 注意這裡的用法，material-ui與router整合的方式 */}
                    {/* 文章是用陣列，例page是從1開始 */}
                    <Button component={Link} to={'/' + (index + 1)}>
                      閱讀更多
                    </Button>
                  </div>
                ))}
              </Grid>
              {/* End main content */}
              {/* Sidebar */}
              <Grid item xs={12} md={4}>
                <Paper elevation={0} className={classes.sidebarAboutBox}>
                  <Typography variant="h6" gutterBottom>
                    About
                  </Typography>
                  <Typography>
                    Etiam porta sem malesuada magna mollis euismod. Cras mattis
                    consectetur purus sit amet fermentum. Aenean lacinia
                    bibendum nulla sed consectetur.
                  </Typography>
                </Paper>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.sidebarSection}
                >
                  Archives
                </Typography>
                {archives.map(archive => (
                  <Typography key={archive}>{archive}</Typography>
                ))}
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.sidebarSection}
                >
                  Social
                </Typography>
                {social.map(network => (
                  <Typography key={network}>{network}</Typography>
                ))}
              </Grid>
              {/* End sidebar */}
            </Grid>
          </main>
        </div>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    )
  }
}

BlogList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(BlogList)
