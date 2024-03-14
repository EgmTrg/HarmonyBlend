namespace HarmonyBlend.Pages
{
	partial class Order
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
			DataGridViewCellStyle dataGridViewCellStyle1 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle2 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle3 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle4 = new DataGridViewCellStyle();
			panel1 = new Panel();
			groupBox1 = new GroupBox();
			checkBox1 = new CheckBox();
			textBox2 = new TextBox();
			label3 = new Label();
			textBox1 = new TextBox();
			label2 = new Label();
			label1 = new Label();
			panel3 = new Panel();
			panel2 = new Panel();
			dataGridView1 = new DataGridView();
			Column1 = new DataGridViewImageColumn();
			Favorite = new DataGridViewCheckBoxColumn();
			Column7 = new DataGridViewCheckBoxColumn();
			Column2 = new DataGridViewTextBoxColumn();
			Column3 = new DataGridViewTextBoxColumn();
			Column5 = new DataGridViewTextBoxColumn();
			Column6 = new DataGridViewTextBoxColumn();
			Column4 = new DataGridViewTextBoxColumn();
			TotalPrice = new DataGridViewTextBoxColumn();
			panel1.SuspendLayout();
			groupBox1.SuspendLayout();
			panel2.SuspendLayout();
			((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
			SuspendLayout();
			// 
			// panel1
			// 
			panel1.Controls.Add(groupBox1);
			panel1.Controls.Add(label1);
			panel1.Dock = DockStyle.Top;
			panel1.Location = new Point(0, 0);
			panel1.Name = "panel1";
			panel1.Size = new Size(1233, 184);
			panel1.TabIndex = 0;
			// 
			// groupBox1
			// 
			groupBox1.Controls.Add(checkBox1);
			groupBox1.Controls.Add(textBox2);
			groupBox1.Controls.Add(label3);
			groupBox1.Controls.Add(textBox1);
			groupBox1.Controls.Add(label2);
			groupBox1.ForeColor = SystemColors.Control;
			groupBox1.Location = new Point(12, 62);
			groupBox1.Name = "groupBox1";
			groupBox1.Size = new Size(281, 110);
			groupBox1.TabIndex = 2;
			groupBox1.TabStop = false;
			groupBox1.Text = "Filtre";
			// 
			// checkBox1
			// 
			checkBox1.AutoSize = true;
			checkBox1.ForeColor = SystemColors.Control;
			checkBox1.Location = new Point(93, 85);
			checkBox1.Name = "checkBox1";
			checkBox1.Size = new Size(151, 19);
			checkBox1.TabIndex = 5;
			checkBox1.Text = "Sadece Favorileri Göster";
			checkBox1.UseVisualStyleBackColor = true;
			// 
			// textBox2
			// 
			textBox2.Location = new Point(93, 56);
			textBox2.Name = "textBox2";
			textBox2.Size = new Size(173, 23);
			textBox2.TabIndex = 4;
			// 
			// label3
			// 
			label3.AutoSize = true;
			label3.ForeColor = SystemColors.Control;
			label3.Location = new Point(20, 59);
			label3.Name = "label3";
			label3.Size = new Size(57, 15);
			label3.TabIndex = 3;
			label3.Text = "Ürün Adı:";
			// 
			// textBox1
			// 
			textBox1.Location = new Point(93, 27);
			textBox1.Name = "textBox1";
			textBox1.Size = new Size(173, 23);
			textBox1.TabIndex = 4;
			// 
			// label2
			// 
			label2.AutoSize = true;
			label2.ForeColor = SystemColors.Control;
			label2.Location = new Point(20, 30);
			label2.Name = "label2";
			label2.Size = new Size(67, 15);
			label2.TabIndex = 3;
			label2.Text = "Ürün Kodu:";
			// 
			// label1
			// 
			label1.AutoSize = true;
			label1.BackColor = Color.FromArgb(54, 64, 78);
			label1.Font = new Font("Castellar", 22.25F);
			label1.ForeColor = Color.White;
			label1.Location = new Point(12, 9);
			label1.Name = "label1";
			label1.Size = new Size(225, 36);
			label1.TabIndex = 1;
			label1.Text = "ORDER PAGE";
			// 
			// panel3
			// 
			panel3.Dock = DockStyle.Bottom;
			panel3.Location = new Point(0, 589);
			panel3.Name = "panel3";
			panel3.Size = new Size(1233, 63);
			panel3.TabIndex = 1;
			// 
			// panel2
			// 
			panel2.Controls.Add(dataGridView1);
			panel2.Dock = DockStyle.Fill;
			panel2.Location = new Point(0, 184);
			panel2.Name = "panel2";
			panel2.Size = new Size(1233, 405);
			panel2.TabIndex = 2;
			// 
			// dataGridView1
			// 
			dataGridView1.AllowUserToOrderColumns = true;
			dataGridViewCellStyle1.BackColor = Color.FromArgb(224, 224, 224);
			dataGridView1.AlternatingRowsDefaultCellStyle = dataGridViewCellStyle1;
			dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
			dataGridView1.BackgroundColor = Color.FromArgb(39, 47, 59);
			dataGridView1.BorderStyle = BorderStyle.None;
			dataGridView1.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
			dataGridViewCellStyle2.Alignment = DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle2.BackColor = Color.FromArgb(54, 64, 78);
			dataGridViewCellStyle2.Font = new Font("Segoe UI", 11.25F, FontStyle.Regular, GraphicsUnit.Point, 162);
			dataGridViewCellStyle2.ForeColor = SystemColors.Window;
			dataGridViewCellStyle2.SelectionBackColor = Color.Silver;
			dataGridViewCellStyle2.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle2.WrapMode = DataGridViewTriState.True;
			dataGridView1.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle2;
			dataGridView1.ColumnHeadersHeight = 30;
			dataGridView1.Columns.AddRange(new DataGridViewColumn[] { Column1, Favorite, Column7, Column2, Column3, Column5, Column6, Column4, TotalPrice });
			dataGridViewCellStyle3.Alignment = DataGridViewContentAlignment.MiddleLeft;
			dataGridViewCellStyle3.BackColor = Color.Gainsboro;
			dataGridViewCellStyle3.Font = new Font("Segoe UI", 9F);
			dataGridViewCellStyle3.ForeColor = SystemColors.ControlText;
			dataGridViewCellStyle3.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle3.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle3.WrapMode = DataGridViewTriState.False;
			dataGridView1.DefaultCellStyle = dataGridViewCellStyle3;
			dataGridView1.Dock = DockStyle.Fill;
			dataGridView1.Location = new Point(0, 0);
			dataGridView1.MultiSelect = false;
			dataGridView1.Name = "dataGridView1";
			dataGridViewCellStyle4.Alignment = DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle4.BackColor = Color.FromArgb(54, 64, 78);
			dataGridViewCellStyle4.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point, 162);
			dataGridViewCellStyle4.ForeColor = SystemColors.Window;
			dataGridViewCellStyle4.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle4.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle4.WrapMode = DataGridViewTriState.True;
			dataGridView1.RowHeadersDefaultCellStyle = dataGridViewCellStyle4;
			dataGridView1.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
			dataGridView1.Size = new Size(1233, 405);
			dataGridView1.TabIndex = 0;
			// 
			// Column1
			// 
			Column1.FillWeight = 75F;
			Column1.HeaderText = "Image";
			Column1.MinimumWidth = 20;
			Column1.Name = "Column1";
			Column1.ReadOnly = true;
			// 
			// Favorite
			// 
			Favorite.FillWeight = 50F;
			Favorite.HeaderText = "Favorite";
			Favorite.Name = "Favorite";
			// 
			// Column7
			// 
			Column7.FillWeight = 50F;
			Column7.HeaderText = "Check";
			Column7.MinimumWidth = 50;
			Column7.Name = "Column7";
			// 
			// Column2
			// 
			Column2.FillWeight = 90F;
			Column2.HeaderText = "Product Code";
			Column2.Name = "Column2";
			Column2.ReadOnly = true;
			// 
			// Column3
			// 
			Column3.FillWeight = 200F;
			Column3.HeaderText = "Product Name";
			Column3.Name = "Column3";
			Column3.ReadOnly = true;
			// 
			// Column5
			// 
			Column5.FillWeight = 85F;
			Column5.HeaderText = "Amount";
			Column5.Name = "Column5";
			// 
			// Column6
			// 
			Column6.FillWeight = 50F;
			Column6.HeaderText = "Unit";
			Column6.Name = "Column6";
			Column6.ReadOnly = true;
			// 
			// Column4
			// 
			Column4.HeaderText = "List Price";
			Column4.Name = "Column4";
			Column4.ReadOnly = true;
			// 
			// TotalPrice
			// 
			TotalPrice.HeaderText = "Total Price";
			TotalPrice.Name = "TotalPrice";
			// 
			// Order
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			BackColor = Color.FromArgb(39, 47, 59);
			ClientSize = new Size(1233, 652);
			Controls.Add(panel2);
			Controls.Add(panel3);
			Controls.Add(panel1);
			FormBorderStyle = FormBorderStyle.None;
			Name = "Order";
			Text = "SubPage1";
			Load += Order_Load;
			panel1.ResumeLayout(false);
			panel1.PerformLayout();
			groupBox1.ResumeLayout(false);
			groupBox1.PerformLayout();
			panel2.ResumeLayout(false);
			((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
			ResumeLayout(false);
		}

		#endregion

		private Panel panel1;
		private Panel panel3;
		private Panel panel2;
		private DataGridView dataGridView1;
		private Label label1;
		private GroupBox groupBox1;
		private Label label2;
		private CheckBox checkBox1;
		private TextBox textBox2;
		private Label label3;
		private TextBox textBox1;
		private DataGridViewImageColumn Column1;
		private DataGridViewCheckBoxColumn Favorite;
		private DataGridViewCheckBoxColumn Column7;
		private DataGridViewTextBoxColumn Column2;
		private DataGridViewTextBoxColumn Column3;
		private DataGridViewTextBoxColumn Column5;
		private DataGridViewTextBoxColumn Column6;
		private DataGridViewTextBoxColumn Column4;
		private DataGridViewTextBoxColumn TotalPrice;
	}
}