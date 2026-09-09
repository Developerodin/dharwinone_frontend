from pathlib import Path

create = Path(r"app/(components)/(contentlayout)/ats/jobs/create/page.tsx")
edit = Path(r"app/(components)/(contentlayout)/ats/jobs/edit/[id]/EditJobClient.tsx")

c = create.read_text(encoding="utf-8")
c = c.replace(
    '<div className="xl:col-span-4 md:col-span-6 col-span-12">\n'
    '                        <label htmlFor="org-industry" className="form-label">Industry</label>',
    '<div className="xl:col-span-4 md:col-span-6 col-span-12 flex flex-col">\n'
    '                        <label htmlFor="org-industry" className="form-label">Industry</label>',
)
c = c.replace(
    '<div className="xl:col-span-4 md:col-span-6 col-span-12">\n'
    '                        <label htmlFor="org-founded" className="form-label">Founded</label>',
    '<div className="xl:col-span-4 md:col-span-6 col-span-12 flex flex-col">\n'
    '                        <label htmlFor="org-founded" className="form-label">Founded</label>',
)
c = c.replace(
    '<div className="xl:col-span-4 md:col-span-6 col-span-12">\n'
    '                        <label htmlFor="org-company-size" className="form-label">Company Size</label>\n'
    '                        <select\n'
    '                          id="org-company-size"\n'
    '                          className="form-control"',
    '<div className="xl:col-span-4 md:col-span-6 col-span-12 flex flex-col">\n'
    '                        <label htmlFor="org-company-size" className="form-label">Company Size</label>\n'
    '                        <select\n'
    '                          id="org-company-size"\n'
    '                          className="form-select w-full"',
)
create.write_text(c, encoding="utf-8")

e = edit.read_text(encoding="utf-8")
e = e.replace(
    '<div className="xl:col-span-4 md:col-span-6 col-span-12">\n'
    '                            <label className="form-label">Industry</label>',
    '<div className="xl:col-span-4 md:col-span-6 col-span-12 flex flex-col">\n'
    '                            <label className="form-label">Industry</label>',
)
e = e.replace(
    '<div className="xl:col-span-4 md:col-span-6 col-span-12">\n'
    '                            <label className="form-label">Founded</label>',
    '<div className="xl:col-span-4 md:col-span-6 col-span-12 flex flex-col">\n'
    '                            <label className="form-label">Founded</label>',
)
e = e.replace(
    '<div className="xl:col-span-4 md:col-span-6 col-span-12">\n'
    '                            <label className="form-label">Company Size</label>\n'
    '                            <select\n'
    '                              className="form-control !rounded-md"',
    '<div className="xl:col-span-4 md:col-span-6 col-span-12 flex flex-col">\n'
    '                            <label className="form-label">Company Size</label>\n'
    '                            <select\n'
    '                              className="form-select w-full !rounded-md"',
)
edit.write_text(e, encoding="utf-8")
print("done")
