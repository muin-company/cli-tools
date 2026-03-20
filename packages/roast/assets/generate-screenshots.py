#!/usr/bin/env python3
"""Generate terminal-style screenshots for roast-cli README."""

from PIL import Image, ImageDraw, ImageFont
import os

# Terminal theme colors
BG = (30, 30, 30)
FG = (204, 204, 204)
RED = (255, 85, 85)
GREEN = (80, 250, 123)
YELLOW = (241, 250, 140)
CYAN = (139, 233, 253)
GRAY = (108, 108, 108)
WHITE = (255, 255, 255)
TITLE_BAR = (50, 50, 50)
RED_DOT = (255, 95, 86)
YELLOW_DOT = (255, 189, 46)
GREEN_DOT = (39, 201, 63)

FONT_SIZE = 15
LINE_HEIGHT = 22
PADDING_X = 20
PADDING_TOP = 50
PADDING_BOTTOM = 20
TITLE_BAR_HEIGHT = 36

# Emoji to text replacements for terminal look
EMOJI_MAP = {
    "😊": "[nice]",
    "✨": " * ",
    "💡": " > ",
    "💪": " + ",
    "🔥": " # ",
    "💀": " X ",
    "🚨": " ! ",
    "⚠️": " !! ",
    "❤️": "<3",
}

def get_font(size=FONT_SIZE):
    font_paths = [
        "/System/Library/Fonts/SFMono-Regular.otf",
        "/System/Library/Fonts/Menlo.ttc",
        "/System/Library/Fonts/Monaco.dfont",
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                return ImageFont.truetype(fp, size)
            except:
                continue
    return ImageFont.load_default()

def get_bold_font(size=FONT_SIZE):
    font_paths = [
        "/System/Library/Fonts/SFMono-Bold.otf",
        "/System/Library/Fonts/Menlo.ttc",
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                return ImageFont.truetype(fp, size)
            except:
                continue
    return get_font(size)

def render_terminal(lines, title="Terminal", width=720):
    """Render colored terminal lines to an image.
    
    Each line is a list of (text, color) tuples.
    """
    font = get_font()
    bold_font = get_bold_font()
    
    total_lines = len(lines)
    height = PADDING_TOP + (total_lines * LINE_HEIGHT) + PADDING_BOTTOM
    
    img = Image.new('RGB', (width, height), BG)
    draw = ImageDraw.Draw(img)
    
    # Title bar
    draw.rectangle([0, 0, width, TITLE_BAR_HEIGHT], fill=TITLE_BAR)
    draw.ellipse([12, 11, 24, 23], fill=RED_DOT)
    draw.ellipse([32, 11, 44, 23], fill=YELLOW_DOT)
    draw.ellipse([52, 11, 64, 23], fill=GREEN_DOT)
    
    title_font = get_font(13)
    bbox = draw.textbbox((0, 0), title, font=title_font)
    tw = bbox[2] - bbox[0]
    draw.text(((width - tw) / 2, 10), title, fill=GRAY, font=title_font)
    
    y = PADDING_TOP
    for line in lines:
        x = PADDING_X
        for text, color in line:
            f = bold_font if color == WHITE else font
            draw.text((x, y), text, fill=color, font=f)
            bbox = draw.textbbox((0, 0), text, font=f)
            x += bbox[2] - bbox[0]
        y += LINE_HEIGHT
    
    return img


def generate_mild():
    lines = [
        [("$ ", GRAY), ("roast --severity mild examples/bad.js", GREEN)],
        [("", FG)],
        [("CODE REVIEW (Be Nice Mode)", YELLOW)],
        [("Friendly feedback mode", GREEN)],
        [("Victim: bad.js (JavaScript)", GRAY)],
        [("--------------------------------------------------", GRAY)],
        [("", FG)],
        [("> ", YELLOW), ("Hey! A few friendly suggestions for processData:", FG)],
        [("", FG)],
        [("> ", YELLOW), ("The Nesting", WHITE)],
        [("  Those 5 nested if-statements make it harder to follow.", FG)],
        [("  Try early returns or guard clauses -- your future", FG)],
        [("  self will thank you!", FG)],
        [("", FG)],
        [("> ", YELLOW), ("var -> const/let", WHITE)],
        [("  Switching to const/let gives you block scoping and", FG)],
        [("  prevents accidental reassignment. Small change, big win!", FG)],
        [("", FG)],
        [("> ", YELLOW), ("Variable Names", WHITE)],
        [("  n, a, e could be name, age, email -- much easier to", FG)],
        [("  read at a glance.", FG)],
        [("", FG)],
        [(" * ", GREEN), ("Good news: the logic is correct! The function does", FG)],
        [("  what it's supposed to. With some cleanup, this could", FG)],
        [("  be really clean code.", FG)],
        [("", FG)],
        [(" + ", CYAN), ("Keep going! Everyone writes code like this starting out.", FG)],
        [("", FG)],
        [("--------------------------------------------------", GRAY)],
        [("Roasted with <3 by Claude", GRAY)],
    ]
    return render_terminal(lines, "roast -- mild")


def generate_medium():
    lines = [
        [("$ ", GRAY), ("roast --severity medium examples/bad.js", GREEN)],
        [("", FG)],
        [("### CODE ROAST ###", RED)],
        [("Victim: bad.js (JavaScript)", GRAY)],
        [("--------------------------------------------------", GRAY)],
        [("", FG)],
        [("# ", RED), ("The Pyramid of Doom (lines 3-15)", WHITE)],
        [("  Five nested if-statements. This isn't code, it's an", FG)],
        [("  archaeological dig. Ever heard of early returns?", FG)],
        [("  Guard clauses exist for a reason.", FG)],
        [("", FG)],
        [("# ", RED), ("var in 2026?!", WHITE)],
        [("  Using var is like still having a MySpace page.", FG)],
        [("  const and let have been around for a decade.", FG)],
        [("  A whole decade. Let that sink in.", FG)],
        [("", FG)],
        [("# ", RED), ("Single-letter variables: n, a, e", WHITE)],
        [("  I too enjoy playing Scrabble while reading code.", FG)],
        [("  name, age, email -- you have a whole keyboard.", FG)],
        [("", FG)],
        [("> ", YELLOW), ("The whole function can be one filter + map:", WHITE)],
        [("  ", FG), ("d.filter(u => u.active && u.age > 18 && u.name)", CYAN)],
        [("   ", FG), (".map(({ name, age, email }) => ...)", CYAN)],
        [("", FG)],
        [(" * ", GREEN), ("At least the logic is correct. That's... something.", FG)],
        [("", FG)],
        [("--------------------------------------------------", GRAY)],
        [("Roasted with <3 by Claude", GRAY)],
    ]
    return render_terminal(lines, "roast -- medium")


def generate_brutal():
    lines = [
        [("$ ", GRAY), ("roast --severity harsh examples/bad.js", GREEN)],
        [("", FG)],
        [("XXX CODE EXECUTION XXX", RED)],
        [("WARNING: Brutally honest mode enabled", RED)],
        [("Victim: bad.js (JavaScript)", GRAY)],
        [("--------------------------------------------------", GRAY)],
        [("", FG)],
        [("### ", RED), ("THE PYRAMID OF DOOM", WHITE)],
        [("  FIVE nested if-statements?! This isn't code, it's a", FG)],
        [("  BLOODY RUSSIAN NESTING DOLL! I've seen less nesting", FG)],
        [("  in a bird sanctuary! EVER HEARD OF EARLY RETURNS?!", FG)],
        [("", FG)],
        [("X ", RED), ("var IN 2026?!", WHITE)],
        [("  Using var is like cooking with a MICROWAVE in a", FG)],
        [("  Michelin kitchen! ES6 came out in 2015. That's", FG)],
        [("  ELEVEN YEARS AGO, you absolute donut!", FG)],
        [("", FG)],
        [("X ", RED), ("SINGLE-LETTER VARIABLES: d, n, a, e", WHITE)],
        [("  This reads like you're playing bloody SCRABBLE,", FG)],
        [("  not writing code! What is 'd'? Data? Dogs?", FG)],
        [("  Disappointment? (It's disappointment.)", FG)],
        [("", FG)],
        [("### ", RED), ("GLOBAL STATE EVERYWHERE", WHITE)],
        [("  GLOBAL_USERS, GLOBAL_COUNT, temp -- you've built", FG)],
        [("  a monument to everything wrong with JavaScript!", FG)],
        [("", FG)],
        [("! ", RED), ("Rating: 2/10", WHITE), (" -- I've seen better code from a toaster.", FG)],
        [("", FG)],
        [("--------------------------------------------------", GRAY)],
        [("Roasted with <3 by Claude", GRAY)],
    ]
    return render_terminal(lines, "roast -- brutal")


if __name__ == "__main__":
    out_dir = os.path.join(os.path.dirname(__file__), "screenshots")
    os.makedirs(out_dir, exist_ok=True)
    
    mild = generate_mild()
    mild.save(os.path.join(out_dir, "roast-mild.png"))
    print("saved roast-mild.png")
    
    medium = generate_medium()
    medium.save(os.path.join(out_dir, "roast-medium.png"))
    print("saved roast-medium.png")
    
    brutal = generate_brutal()
    brutal.save(os.path.join(out_dir, "roast-brutal.png"))
    print("saved roast-brutal.png")
    
    print("\nAll screenshots saved to assets/screenshots/")
