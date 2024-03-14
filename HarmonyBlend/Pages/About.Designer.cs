namespace HarmonyBlend.Pages
{
	partial class About
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing) {
			if(disposing && (components != null)) {
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Windows Form Designer generated code

		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent() {
			System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(About));
			panel1 = new Panel();
			label1 = new Label();
			pictureBox1 = new PictureBox();
			label2 = new Label();
			panel1.SuspendLayout();
			((System.ComponentModel.ISupportInitialize)pictureBox1).BeginInit();
			SuspendLayout();
			// 
			// panel1
			// 
			panel1.Controls.Add(label1);
			panel1.Dock = DockStyle.Top;
			panel1.Location = new Point(0, 0);
			panel1.Name = "panel1";
			panel1.Size = new Size(1156, 77);
			panel1.TabIndex = 1;
			// 
			// label1
			// 
			label1.Anchor = AnchorStyles.None;
			label1.AutoSize = true;
			label1.BackColor = Color.FromArgb(54, 64, 78);
			label1.Font = new Font("Castellar", 22.25F);
			label1.ForeColor = Color.White;
			label1.Location = new Point(337, 19);
			label1.Name = "label1";
			label1.Size = new Size(494, 36);
			label1.TabIndex = 0;
			label1.Text = "H A R M O N Y       B L E N D";
			// 
			// pictureBox1
			// 
			pictureBox1.Anchor = AnchorStyles.None;
			pictureBox1.Image = Properties.Resources._c8ee5be0_988a_4ba2_a2be_b7f600344b3a_removebg_preview;
			pictureBox1.Location = new Point(824, 467);
			pictureBox1.Name = "pictureBox1";
			pictureBox1.Size = new Size(275, 242);
			pictureBox1.SizeMode = PictureBoxSizeMode.Zoom;
			pictureBox1.TabIndex = 1;
			pictureBox1.TabStop = false;
			// 
			// label2
			// 
			label2.AutoSize = true;
			label2.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold, GraphicsUnit.Point, 0);
			label2.ForeColor = Color.White;
			label2.Location = new Point(53, 115);
			label2.Name = "label2";
			label2.Size = new Size(1026, 420);
			label2.TabIndex = 1;
			label2.Text = resources.GetString("label2.Text");
			// 
			// About
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			AutoScroll = true;
			BackColor = Color.FromArgb(39, 47, 59);
			ClientSize = new Size(1156, 755);
			Controls.Add(pictureBox1);
			Controls.Add(label2);
			Controls.Add(panel1);
			FormBorderStyle = FormBorderStyle.None;
			Name = "About";
			Text = "About";
			panel1.ResumeLayout(false);
			panel1.PerformLayout();
			((System.ComponentModel.ISupportInitialize)pictureBox1).EndInit();
			ResumeLayout(false);
			PerformLayout();
		}

		#endregion

		private Panel panel1;
		private Label label1;
		private PictureBox pictureBox1;
		private Label label2;
	}
}