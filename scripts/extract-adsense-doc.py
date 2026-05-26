import zipfile
import xml.etree.ElementTree as ET
import sys

DOCX = r"c:\Users\Dell\AppData\Local\Temp\Adsense Improvements.docx"
OUT = r"C:\Téléchargements\Me\sounez\scripts\adsense-doc-extract.txt"
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def para_text(p):
    return "".join(t.text or "" for t in p.iter(f"{W}t"))


def main():
    with zipfile.ZipFile(DOCX) as z:
        root = ET.fromstring(z.read("word/document.xml"))
    body = root.find(f"{W}body")
    lines = []
    for el in body:
        if el.tag == f"{W}p":
            lines.append(para_text(el))
        elif el.tag == f"{W}tbl":
            for tr in el.findall(f".//{W}tr"):
                row = []
                for tc in tr.findall(f"{W}tc"):
                    row.append(
                        " ".join(para_text(p) for p in tc.findall(f".//{W}p")).strip()
                    )
                lines.append("\t".join(row))
    text = "\n".join(lines)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(text)
    print(text)


if __name__ == "__main__":
    main()
