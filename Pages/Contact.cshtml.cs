using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;

namespace dotnet_webpack.Pages
{
    public class ContactModel : PageModel
    {
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Subject { get; set; }

        [Required(ErrorMessage = "Please enter a message.")]
        public string Message { get; set; }

        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            return RedirectToPage("/Index");
        }
    }
}
