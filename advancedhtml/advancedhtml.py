"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from xblock.core import XBlock
from xblock.fields import Integer, Scope, String
from xblock.fragment import Fragment

defaultHTMLString = """<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
        <p>This is an Advanced HTML Component</p>
    </body>
</html>
"""
class AdvancedHTMLXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    display_name = String(
        default="Advanced HTML Block",
        help="The display name of the XBlock"
    )
    has_score=False
    icon_class=other
    count = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )
    htmlcontent = String(
        default=defaultHTMLString, scope=Scope.content,
        help="Source code of HTML courseware"
    )
    non_editable_metadata_fields=["display_name", "has_score", "icon_class", "htmlcontent"]

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the AdvancedHTMLXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/advancedhtml.html")
        #frag = Fragment(html.format(self=self))
        frag = Fragment(html)
        frag.add_css(self.resource_string("static/css/advancedhtml.css"))
        frag.add_javascript(self.resource_string("static/js/src/advancedhtml.js"))
        frag.initialize_js('AdvancedHTMLXBlock')
        return frag

    def studio_view(self, context=None):
        """
        The view that opens on clicking edit button in studio
        """
        html = self.resource_string("static/html/advancedhtml_edit.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/advancedhtml.css"))
        frag.add_javascript(self.resource_string("static/js/src/advancedhtml.js"))
        frag.initialize_js('AdvancedHTMLXBlock_EditorInit')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def increment_count(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        assert data['hello'] == 'world'

        self.count += 1
        return {"count": self.count}

    @XBlock.json_handler
    def get_html_content(self, data, suffix=''):
        assert data['need_data'] == 'true'
        return {"htmlcontent": self.htmlcontent}
    
    @XBlock.json_handler
    def set_html_content(self, data, suffix=''):
        self.htmlcontent = data['set_data']
        return {"htmlcontent": self.htmlcontent}
    
    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("AdvancedHTMLXBlock",
             """<advancedhtml/>
             """),
            ("Multiple AdvancedHTMLXBlock",
             """<vertical_demo>
                <advancedhtml/>
                <advancedhtml/>
                <advancedhtml/>
                </vertical_demo>
             """),
        ]
